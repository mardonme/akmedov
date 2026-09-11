/**
 * POST /api/order — delivery order intake.
 *
 * Takes the /dostavka form, re-validates it (the browser's checks are a UX
 * convenience, not a guarantee), and posts a formatted card into the admin
 * Telegram group. There is no database: the Telegram message IS the order.
 *
 * Env (Vercel Project Settings — no VITE_ prefix, or the token would be
 * inlined into the browser bundle):
 *   TELEGRAM_BOT_TOKEN   from @BotFather
 *   TELEGRAM_CHAT_ID     the admin group, e.g. -1001234567890
 *
 * Note: /api/* only reaches this function because vercel.json excludes it from
 * the SPA rewrite. Re-adding a catch-all "/(.*)" rewrite would silently break
 * every order.
 */
import {
  DAYS,
  deliveryDate,
  findSlot,
  formatSum,
  getZone,
  tashkentNow,
  toE164,
  validateOrder,
} from "../src/utils/delivery.js";

const TELEGRAM_TIMEOUT_MS = 8000;

/* ------------------------------------------------------------- rate limit */

// Best-effort only: serverless instances are ephemeral and run in parallel, so
// this throttles a single hot instance rather than the endpoint as a whole. It
// is here to blunt an accidental double-submit or a lazy script, nothing more.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const hits = new Map();

const clientIp = (req) =>
  String(req.headers["x-forwarded-for"] ?? "")
    .split(",")[0]
    .trim() ||
  req.socket?.remoteAddress ||
  "unknown";

const rateLimited = (ip, now) => {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  hits.set(ip, [...recent, now]);
  if (hits.size > 500) {
    for (const [key, stamps] of hits) {
      if (!stamps.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
};

/* --------------------------------------------------------------- helpers */

const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]
  );

/** Trim a free-text field so one pasted essay cannot blow the 4096-char cap. */
const clip = (value, max) => {
  const text = String(value ?? "").trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
};

/**
 * AKH-260911-4821. The suffix is random, not a counter — a stateless function
 * has nothing to count with. Operators match orders by phone and time anyway;
 * the number exists so a customer can quote it on the phone.
 */
const orderNumber = (now) => {
  const stamp = [
    String(now.getFullYear()).slice(2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  return `AKH-${stamp}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
};

const buildMessage = ({ number, values, zone, now }) => {
  const slot = findSlot(values.slotId);
  const day = DAYS.find((d) => d.offset === values.dayOffset);

  const address = [
    zone.city,
    values.district,
    values.street && `ул. ${values.street}`,
    values.house && `д. ${values.house}`,
    values.flat && `кв. ${values.flat}`,
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join(", ");

  const lines = [
    `🍦 <b>НОВЫЙ ЗАКАЗ</b>  <code>${number}</code>`,
    "",
    `👤 ${escapeHtml(values.name)}  ·  ${escapeHtml(toE164(values.phone))}`,
    `📍 ${address}`,
  ];

  if (values.landmark) lines.push(`   ориентир: ${escapeHtml(clip(values.landmark, 200))}`);

  // Coerce before interpolating: these land inside an href, so a string that
  // isn't a number must never reach the attribute. &amp; because the message
  // is parsed as HTML.
  const lat = Number(values.lat);
  const lng = Number(values.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng) && (lat || lng)) {
    lines.push(
      `🗺 <a href="https://yandex.uz/maps/?pt=${lng},${lat}&amp;z=17">Точка на карте</a>`
    );
  }

  lines.push(
    `🕐 ${day.label}, ${deliveryDate(values.dayOffset, now)}, ${slot.label}`,
    "",
    "━━━ <b>ЗАКАЗ</b> ━━━",
    escapeHtml(clip(values.order, 1500)),
    "━━━━━━━━━━━━",
    "",
    values.changeFrom
      ? `💵 Наличными, сдача с ${escapeHtml(clip(values.changeFrom, 20))}`
      : "💵 Наличными курьеру",
    `🚚 Доставка: ${formatSum(zone.fee)} · минимальный заказ ${formatSum(zone.minOrder)}`
  );

  if (values.comment) lines.push(`💬 ${escapeHtml(clip(values.comment, 400))}`);

  return lines.join("\n");
};

const sendToTelegram = async (text) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("telegram_not_configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) {
      throw new Error(`telegram_rejected: ${payload.description ?? response.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
};

/* --------------------------------------------------------------- handler */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "invalid_json" });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false, error: "invalid_body" });
  }

  // Honeypot: a hidden field no human ever fills. Answer 200 so the bot has no
  // signal to adapt to, but send nothing on.
  if (String(body.hp ?? "").trim()) {
    return res.status(200).json({ ok: true, number: orderNumber(tashkentNow()) });
  }

  if (rateLimited(clientIp(req), Date.now())) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  const now = tashkentNow();
  const errors = validateOrder(body, now);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: "validation_failed", errors });
  }

  const zone = getZone(body.zoneId);
  const number = orderNumber(now);

  try {
    await sendToTelegram(buildMessage({ number, values: body, zone, now }));
  } catch (error) {
    console.error("[order] delivery to Telegram failed:", error.message);
    // The client falls back to the existing contact endpoint and shows the
    // phone number, so a Telegram outage never swallows an order silently.
    return res.status(502).json({ ok: false, error: "telegram_unavailable" });
  }

  return res.status(200).json({ ok: true, number });
}
