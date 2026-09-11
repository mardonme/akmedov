import axios from "axios";
import { apiClient } from "./client";
import { DAYS, findSlot, getZone, toE164 } from "../utils/delivery";

/**
 * Same-origin call — deliberately NOT apiClient, whose baseURL points at the
 * external message server. /api/order is the Vercel function in this repo.
 */
export const submitDeliveryOrder = (payload) =>
  axios.post("/api/order", payload, { timeout: 15000 }).then((res) => res.data);

/**
 * Last resort when /api/order itself is unreachable (function cold-start
 * failure, Telegram outage). The order is pushed through the existing contact
 * endpoint so it reaches a human instead of vanishing; the UI still shows the
 * phone number, because this path has no confirmation loop.
 */
export const submitOrderFallback = (values) => {
  const zone = getZone(values.zoneId);
  const slot = findSlot(values.slotId);
  const day = DAYS.find((d) => d.offset === values.dayOffset);

  const body = [
    "ЗАКАЗ ДОСТАВКИ (резервный канал — Telegram недоступен)",
    `Адрес: ${[zone?.city, values.district, values.street, values.house, values.flat]
      .filter(Boolean)
      .join(", ")}`,
    values.landmark && `Ориентир: ${values.landmark}`,
    `Время: ${day?.label ?? ""} ${slot?.label ?? ""}`,
    "",
    "Заказ:",
    values.order,
    "",
    values.changeFrom && `Сдача с: ${values.changeFrom}`,
    values.comment && `Комментарий: ${values.comment}`,
  ]
    .filter(Boolean)
    .join("\n");

  const data = new FormData();
  data.append("name", values.name);
  data.append("phone", toE164(values.phone));
  data.append("email", "");
  data.append("context", "Заказ доставки");
  data.append("content", body);

  return apiClient.post("/message/submit", data);
};
