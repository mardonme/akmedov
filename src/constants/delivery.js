/**
 * Delivery configuration for the /dostavka order form.
 *
 * The served area is Tashkent city and Tashkent region — nothing else. Fees,
 * minimum order and cut-off times are still PLACEHOLDER VALUES pending real
 * numbers from the company (docs/dostavka-concept.md §10). When they arrive
 * only this file changes — no component hard-codes a zone, a slot or a fee
 * anywhere else.
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
 * zone, so the region can offer fewer windows than the city.
 *
 * `label` is what the customer picks from; `city` is the prefix of the address
 * line in the Telegram message. `districts` is the second dropdown — for the
 * city those are its districts, for the region its towns and districts, which
 * is why `districtLabel` differs between the two.
 *
 * `mapCenter` / `mapZoom` are only where the map opens before the customer
 * drops a pin.
 */
export const deliveryZones = [
  {
    id: "tashkent",
    label: "Ташкент (город)",
    city: "Ташкент",
    districtLabel: "Район",
    districts: [
      "Алмазарский район",
      "Бектемирский район",
      "Мирабадский район",
      "Мирзо-Улугбекский район",
      "Сергелийский район",
      "Учтепинский район",
      "Чиланзарский район",
      "Шайхантахурский район",
      "Юнусабадский район",
      "Яккасарайский район",
      "Янгихаётский район",
      "Яшнабадский район",
    ],
    fee: 25000,
    minOrder: 100000,
    leadTimeMin: 90,
    slots: ["12-14", "14-16", "16-18", "18-20"],
    mapCenter: [41.3111, 69.2797],
    mapZoom: 11,
  },
  {
    id: "tashkent-region",
    label: "Ташкентская область",
    city: "Ташкентская область",
    districtLabel: "Город / район",
    districts: [
      "Нурафшан",
      "Чирчик",
      "Ангрен",
      "Алмалык",
      "Ахангаран",
      "Бекабад",
      "Янгиюль",
      "Аккурганский район",
      "Бостанлыкский район",
      "Букинский район",
      "Зангиатинский район",
      "Кибрайский район",
      "Куйичирчикский район",
      "Паркентский район",
      "Пскентский район",
      "Ташкентский район",
      "Уртачирчикский район",
      "Чиназский район",
      "Юкоричирчикский район",
      "Янгиюльский район",
    ],
    fee: 45000,
    minOrder: 200000,
    leadTimeMin: 180,
    slots: ["14-16", "16-18", "18-20"],
    mapCenter: [41.1, 69.5],
    mapZoom: 9,
  },
];

/** Order intake window. Outside it the form still accepts orders for tomorrow. */
export const workingHours = { fromMin: 9 * 60, toMin: 20 * 60 };

export const paymentNote = "Наличными курьеру";
