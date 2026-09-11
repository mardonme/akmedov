/**
 * Helpers for the /dostavka order form: phone masking, delivery-slot
 * availability and the "remember me" profile in localStorage.
 *
 * Kept free of React so api/order.js can reuse the validation rules — the
 * server must not trust anything the browser checked. That sharing is also why
 * the import below carries an explicit .js extension: Vite resolves either
 * form, but the Vercel Node runtime needs the extension.
 */
import { deliveryZones, timeSlots, workingHours } from "../constants/delivery.js";

/* ------------------------------------------------------------------ phone */

/** Strip everything but the 9 national digits (a leading 998 is dropped). */
export const normalizePhone = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  const national = digits.startsWith("998") ? digits.slice(3) : digits;
  return national.slice(0, 9);
};

/** 901234567 -> "+998 90 123-45-67". Used as an input mask, so it has to
 *  render sensibly for every partial length. */
export const formatPhone = (value) => {
  const d = normalizePhone(value);
  let out = "+998";
  if (d.length > 0) out += ` ${d.slice(0, 2)}`;
  if (d.length > 2) out += ` ${d.slice(2, 5)}`;
  if (d.length > 5) out += `-${d.slice(5, 7)}`;
  if (d.length > 7) out += `-${d.slice(7, 9)}`;
  return out;
};

/** Deliberately permissive: 9 digits that don't start with 0. Guessing at the
 *  valid operator-code list would reject real customers when a new code opens. */
export const isValidPhone = (value) => /^[1-9]\d{8}$/.test(normalizePhone(value));

/** E.164 for the Telegram message, so the operator can tap to call. */
export const toE164 = (value) => `+998${normalizePhone(value)}`;

/* ------------------------------------------------------------------ money */

/** ru-RU renders thousands with a non-breaking space (and a narrow one on
 *  newer ICU builds); normalise it so the value copies and wraps predictably. */
export const formatSum = (amount) =>
  `${Number(amount).toLocaleString("ru-RU").replace(/\s/g, " ")} сум`;

/* ------------------------------------------------------------------ zones */

export const getZone = (zoneId) =>
  deliveryZones.find((zone) => zone.id === zoneId) ?? null;

/* --------------------------------------------------------------- timezone */

const TZ = "Asia/Tashkent";

/**
 * Wall-clock time in Tashkent, returned as a Date whose *local* getters read
 * the Tashkent hour. Never use the bare host clock for slot logic: Vercel runs
 * in UTC (5 hours behind) and a customer's device can be set to anything.
 */
export const tashkentNow = (from = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(from)
    .reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});

  // Some ICU builds render midnight as hour "24" under hour12:false.
  const hour = parts.hour === "24" ? 0 : Number(parts.hour);
  return new Date(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    hour,
    Number(parts.minute),
    Number(parts.second)
  );
};

/** "11.09.2026" for the day the customer picked, in Tashkent terms. */
export const deliveryDate = (dayOffset, now = tashkentNow()) => {
  const date = new Date(now);
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/* ------------------------------------------------------------------ slots */

export const DAYS = [
  { offset: 0, label: "Сегодня" },
  { offset: 1, label: "Завтра" },
];

const minutesNow = (now) => now.getHours() * 60 + now.getMinutes();

/**
 * Slots for one zone on one day, each flagged with whether it can still be
 * picked. Today a slot closes `leadTimeMin` before it starts, so a courier
 * always has time to pack and drive; tomorrow every slot is open.
 */
export const getSlots = (zone, dayOffset, now = tashkentNow()) => {
  if (!zone) return [];
  const zoneSlots = timeSlots.filter((slot) => zone.slots.includes(slot.id));
  if (dayOffset > 0) return zoneSlots.map((slot) => ({ ...slot, available: true }));

  const cutoff = minutesNow(now) + zone.leadTimeMin;
  return zoneSlots.map((slot) => ({ ...slot, available: cutoff <= slot.startMin }));
};

/** True when at least one of today's windows is still reachable. Drives the
 *  explanation under a greyed-out "Сегодня", which otherwise looks like a bug. */
export const hasSlotsToday = (zone, now = tashkentNow()) =>
  getSlots(zone, 0, now).some((slot) => slot.available);

const hhmm = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export const workingHoursLabel = () =>
  `${hhmm(workingHours.fromMin)}–${hhmm(workingHours.toMin)}`;

export const findSlot = (slotId) => timeSlots.find((slot) => slot.id === slotId) ?? null;

/* -------------------------------------------------------------- profile */

const PROFILE_KEY = "akh_profile";

/** Every access is guarded: private mode and "block site data" both throw. */
export const loadProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveProfile = (profile) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    /* quota exceeded or storage blocked — the order still went through */
  }
};

/* ------------------------------------------------------------ validation */

const MIN_ORDER_TEXT = 5;

/**
 * Shared by the form and by api/order.js. Returns a { field: message } map;
 * empty means valid.
 */
export const validateOrder = (values, now = tashkentNow()) => {
  const errors = {};
  const zone = getZone(values.zoneId);

  if (!zone) errors.zoneId = "Выберите город доставки";
  if (!String(values.name ?? "").trim() || values.name.trim().length < 2)
    errors.name = "Укажите имя";
  if (!isValidPhone(values.phone)) errors.phone = "Укажите номер в формате +998 90 123-45-67";
  if (!String(values.street ?? "").trim()) errors.street = "Укажите улицу";
  if (!String(values.house ?? "").trim()) errors.house = "Укажите дом";
  if (!String(values.order ?? "").trim() || values.order.trim().length < MIN_ORDER_TEXT)
    errors.order = "Напишите, что привезти";

  if (!DAYS.some((day) => day.offset === values.dayOffset))
    errors.dayOffset = "Выберите день доставки";
  else if (!zone) {
    /* zone error already reported */
  } else {
    const slot = getSlots(zone, values.dayOffset, now).find((s) => s.id === values.slotId);
    if (!slot) errors.slotId = "Выберите время доставки";
    else if (!slot.available) errors.slotId = "Это время уже недоступно";
  }

  return errors;
};
