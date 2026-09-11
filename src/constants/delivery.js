/**
 * Delivery configuration for the /dostavka order form.
 *
 * PLACEHOLDER VALUES. The real zones, districts, fees, minimum order and
 * cut-off times still have to come from the company (docs/dostavka-concept.md
 * §10). When they arrive only this file changes — no component hard-codes a
 * zone, a slot or a fee anywhere else.
 */

/**
 * Delivery windows offered to the customer. `startMin` / `endMin` are minutes
 * from midnight and drive the "this slot already passed" logic in
 * src/utils/delivery.js — keep them in sync with `label`.
 */
export const timeSlots = [
  { id: "12-14", label: "12:00–14:00", startMin: 12 * 60, endMin: 14 * 60 },
  { id: "14-16", label: "14:00–16:00", startMin: 14 * 60, endMin: 16 * 60 },
  { id: "16-18", label: "16:00–18:00", startMin: 16 * 60, endMin: 18 * 60 },
  { id: "18-20", label: "18:00–20:00", startMin: 18 * 60, endMin: 20 * 60 },
];

/**
 * Zones we deliver to. `slots` lists the ids from `timeSlots` available in that
 * zone, so a far district can offer fewer windows than the city centre.
 *
 * `mapCenter` is only where the map opens before the customer drops a pin —
 * approximate city centres, worth confirming once the map key is in place.
 */
export const deliveryZones = [
  {
    id: "sirdaryo",
    region: "Сырдарьинская область",
    city: "Сырдарья",
    districts: ["Центр", "Достлик", "Рахимов", "Янгиобод"],
    fee: 15000,
    minOrder: 50000,
    leadTimeMin: 90,
    slots: ["12-14", "14-16", "16-18", "18-20"],
    mapCenter: [40.8408, 68.6608],
  },
  {
    id: "gulistan",
    region: "Сырдарьинская область",
    city: "Гулистан",
    districts: ["Центр", "Мустакиллик", "Навруз"],
    fee: 20000,
    minOrder: 70000,
    leadTimeMin: 120,
    slots: ["14-16", "16-18", "18-20"],
    mapCenter: [40.4897, 68.7842],
  },
];

/** Order intake window. Outside it the form still accepts orders for tomorrow. */
export const workingHours = { fromMin: 9 * 60, toMin: 20 * 60 };

export const paymentNote = "Наличными курьеру";
