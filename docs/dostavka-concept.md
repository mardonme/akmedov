# Uyga yetkazib berish (Доставка на дом) — loyiha konsepsiyasi

**Sana:** 2026-09-11
**Holat:** amalga oshirildi (2026-09-11). Qurilgan fayllar 16-bo'limda.
**Repo:** `akmedov` (ichki nom `katta-mehnat`), React 18 + Vite, Vercel

> **Qamrov o'zgarishi.** Dastlab to'liq onlayn do'kon (savat, mahsulot kartochkalari,
> qidiruv, narxlar) rejalashtirilgan edi. Qaror bo'yicha qamrov toraytirildi:
> **faqat buyurtma formasi**. Sabab va oqibatlari 3-bo'limda.

---

## 1. Maqsad

Saytga **yetkazib berish buyurtmasi formasi** qo'shish. Mijoz ismi, telefoni,
manzili, qulay vaqti va nima kerakligini yozadi → buyurtma admin Telegramiga tushadi
→ operator qo'ng'iroq qilib tasdiqlaydi → kuryer naqd to'lov bilan yetkazadi.

Bu **e-commerce emas**, balki **buyurtma qabul qilish kanali**. Farqi muhim:
sotuv sayt orqali emas, telefon orqali yakunlanadi. Sayt shunchaki qo'ng'iroqni
strukturalangan ma'lumot bilan almashtiradi.

## 2. Tasdiqlangan qarorlar

| Savol | Qaror | Natija |
|---|---|---|
| Qamrov | **Faqat buyurtma formasi** | Savat, kartochka, qidiruv, narx — yo'q |
| Backend | Telegram bot + Vercel serverless | Shu repoda `api/order.js`. Alohida server/DB yo'q |
| Kabinet | Ro'yxatdan o'tishsiz | Ism/telefon/manzil `localStorage` da, keyingi safar avtomatik |
| Mahsulot ma'lumoti | **Kerak emas** | Narxlar ro'yxati blokirovkachisi yo'qoldi |
| Til | Rus tili | Hozirgi saytga izchil |
| To'lov | Faqat naqd (kuryerga) | To'lov shlyuzi kerak emas |

---

## 3. Nima quriladi va nima qurilmaydi

### ✅ Quriladi

- `/dostavka` — bitta sahifa, bitta forma
- Xaritadan manzil belgilash (Yandex Maps)
- Yetkazish vaqtini tanlash (Bugun / Ertaga + vaqt oraliqlari)
- «Nima kerak» — erkin matn maydoni
- `POST /api/order` → Telegram
- Ma'lumotlarni brauzerda eslab qolish (2-buyurtmada forma to'ldirilgan holda ochiladi)
- Header/Footer/Katalogdan havolalar

### ❌ Qurilmaydi

| Nima | Sabab |
|---|---|
| Savat | Qamrovdan chiqarildi |
| Mahsulot kartochkalari (`[−]1[+]`, «В корзину») | Qamrovdan chiqarildi |
| Qidiruv tizimi | Qamrovdan chiqarildi |
| Mahsulot batafsil sahifasi (tarkib, allergen, o'xshash mahsulotlar) | Qamrovdan chiqarildi |
| Narx ko'rsatish | Mahsulot modeli yo'q |
| Kategoriyalar (Пломбир, Эскимо, Рожок…) | Mahsulot modeli yo'q |
| Хиты / Новинки / Рекомендуем bloklari | Mahsulot modeli yo'q |
| Shaxsiy kabinet sahifasi | Faqat forma avtomatik to'ldiriladi, alohida sahifa keraksiz |

### ⚠️ Buning natijasi — ochiq aytilishi kerak

1. **Mijoz assortimentni bilmaydi.** Nima buyurtma qilishni bilishi uchun avval
   katalogni ko'rishi kerak. Yechim: forma yonida mavjud `/catalog` va PDF havolasi
   turadi (5-bo'limga qarang).
2. **Mijoz narxni bilmaydi.** Buyurtma bergandan keyin operator narxni aytadi.
   Bu tark etish (abandonment) foizini oshiradi va har bir buyurtmaga qo'ng'iroq talab qiladi.
3. **Har bir buyurtma qo'lda qayta ishlanadi.** Erkin matn — «muzqaymoq kerak» deb
   yozilgan buyurtmani operator aniqlashtirishi shart. Kuniga 5–10 buyurtmada bu normal,
   50 tada — muammo.
4. **Kengaytirish yo'li ochiq qoladi.** Ushbu konsepsiya keyinchalik to'liq do'konga
   o'sishiga xalaqit bermaydi: `api/order.js` va manzil/vaqt bloklari o'zgarishsiz
   qayta ishlatiladi, ustiga faqat mahsulot modeli va savat qo'shiladi.

---

## 4. Arxitektura

```
Brauzer (React SPA)
│
├── /dostavka  ← bitta sahifa
│     ├── AddressForm   (+ Yandex Maps nuqta)
│     ├── TimeSlotPicker
│     └── «Что привезти» textarea
│
├── delivery.js          ← hududlar, narx, vaqt oraliqlari (yagona yangi ma'lumot fayli)
├── localStorage["akh_profile"]  ← ism, telefon, manzil
│
└── POST /api/order
       │
       └── Vercel serverless (Node)
            ├── validatsiya + rate-limit + honeypot
            ├── buyurtma raqami
            └── Telegram Bot API → admin guruhi
```

Mavjud `products.js`, `catalogSections`, `/catalog/*` — **tegilmaydi**.

---

## 5. `/dostavka` sahifasi

```
┌──────────────────────────────────────────────┐
│  Доставка мороженого на дом                  │
│  Привезём за 1–2 часа. Оплата наличными.     │
│                                              │
│  ┌── [1] Куда привезти ──────────────────┐   │
│  │  Область / город   [Сырдарья      ▾]  │   │
│  │  Район             [—             ▾]  │   │
│  │  Улица *           [_______________]  │   │
│  │  Дом *             [____]             │   │
│  │  Квартира          [____]             │   │
│  │  Ориентир          [_______________]  │   │
│  │                                       │   │
│  │      [ 📍 Указать на карте ]          │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌── [2] Когда привезти ─────────────────┐   │
│  │  (•) Сегодня      ( ) Завтра          │   │
│  │  [12:00–14:00] [14:00–16:00]          │   │
│  │  [16:00–18:00] [18:00–20:00]          │   │
│  │   ↳ o'tgan slotlar o'chirilgan        │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌── [3] Что привезти ───────────────────┐   │
│  │  ┌─────────────────────────────────┐  │   │
│  │  │ Например:                       │  │   │
│  │  │ Пломбир 1 кг — 2 шт             │  │   │
│  │  │ Эскимо «Прага» — 5 шт           │  │   │
│  │  └─────────────────────────────────┘  │   │
│  │  📖 Посмотреть ассортимент →          │   │
│  │     (/catalog · PDF-каталог)          │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌── Контакты ───────────────────────────┐   │
│  │  Имя *      [_______________]         │   │
│  │  Телефон *  [+998 __ ___-__-__]       │   │
│  │  Комментарий[_______________]         │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  💵 Оплата наличными курьеру                 │
│     Сдача с [________] (необязательно)       │
│                                              │
│        [   ОФОРМИТЬ ЗАКАЗ   ]                │
│                                              │
│  Оператор перезвонит и подтвердит сумму.     │
└──────────────────────────────────────────────┘
```

**«Посмотреть ассортимент» havolasi majburiy element** — 3-bo'limdagi 1-muammoning
yagona yechimi. Mavjud `catalogDownloads` (PDF) va `/catalog/*` qayta ishlatiladi,
yangi hech narsa qurilmaydi.

### Xaritadan manzil (`MapPicker`)

- Yandex Maps JS API, faqat shu sahifada `React.lazy` bilan yuklanadi
- Mijoz nuqta qo'yadi → reverse geocoding ko'cha va uy maydonlarini to'ldiradi
- `lat`/`lng` saqlanadi va Telegram xabariga havola bo'lib tushadi (kuryer uchun)
- Xarita yuklanmasa forma qo'lda to'ldirish bilan ishlashda davom etadi

### Avtomatik to'ldirish

Muvaffaqiyatli buyurtmadan so'ng ism, telefon va manzil `localStorage["akh_profile"]`
ga yoziladi. Keyingi safar mijoz faqat vaqt va «что привезти» ni yozadi.

### Validatsiya

| Maydon | Qoida |
|---|---|
| Ism | majburiy, ≥2 belgi |
| Telefon | majburiy, `+998 XX XXX-XX-XX` maskasi |
| Ko'cha, Uy | majburiy |
| Vaqt sloti | majburiy, o'tgan/juda yaqin slotlar tanlanmaydi |
| Что привезти | majburiy, ≥5 belgi |
| Hudud | `deliveryZones` dan tashqarida bo'lsa — «Мы пока не доставляем в этот район» |

---

## 6. Yagona yangi ma'lumot fayli — `src/constants/delivery.js`

```js
export const deliveryZones = [
  {
    id: "sirdaryo",
    region: "Сырдарьинская область",
    cities: ["Сырдарья", "Гулистан", "Ширин"],
    districts: ["Центр", "Достлик", "Янгиобод"],
    fee: 15000,          // yetkazish narxi, so'm
    minOrder: 50000,     // minimal buyurtma summasi (operator aytadi)
    leadTimeMin: 90,     // slot boshlanishiga kamida 90 daqiqa qolishi kerak
    slots: ["12:00–14:00", "14:00–16:00", "16:00–18:00", "18:00–20:00"],
  },
];

export const workingHours = { from: "09:00", to: "20:00" };
```

CLAUDE.md konvensiyasiga mos: kontent o'zgarsa shu fayl tahrirlanadi.

---

## 7. `/api/order` — serverless funksiya

Fayl: `api/order.js` (Vercel avtomatik ushlaydi).

```
POST /api/order
{ zone, address:{district, street, house, flat, landmark, lat, lng},
  when:{day, slot}, order, customer:{name, phone, comment}, changeFrom, hp }
   ↓
1. Method + Content-Type tekshiriladi
2. hp (honeypot) bo'sh emasmi → bot, jim 200 qaytariladi
3. IP bo'yicha rate-limit (1 daqiqada 3 ta)
4. Maydonlar validatsiyasi (server tomonda takroran)
5. Buyurtma raqami: AKH-260911-0042
6. Telegram xabari formatlanadi → api.telegram.org/bot<TOKEN>/sendMessage
7. { ok: true, number }
```

Savat yo'qligi uchun **server tomonda summa hisoblash kerak emas** — bu funksiyani
sezilarli soddalashtiradi.

**Telegram xabari:**

```
🍦 НОВЫЙ ЗАКАЗ  AKH-260911-0042

👤 Мадина  ·  +998 90 123-45-67
📍 Сырдарья, Достлик, ул. Достлик 20, кв. 5
   ориентир: напротив школы №3
🗺 https://yandex.uz/maps/?pt=68.671,41.038&z=17
🕐 Сегодня, 16:00–18:00

━━━ ЗАКАЗ ━━━
Пломбир 1 кг — 2 шт
Эскимо «Прага» — 5 шт
━━━━━━━━━━━━

💵 Наличными, сдача с 100 000
💬 Позвонить за 10 минут
🚚 Доставка: 15 000 сум
```

**Env (Vercel Project Settings, `VITE_` prefiksisiz):**
```
TELEGRAM_BOT_TOKEN=...    ← @BotFather
TELEGRAM_CHAT_ID=-100...  ← admin guruhi
```
`VITE_` qo'yilsa token brauzer bundle'iga tushadi — qo'yilmaydi.

**Zaxira yo'l:** Telegram javob bermasa, buyurtma mavjud `/message/submit`
endpointiga yuboriladi va mijozga «Позвоните нам: +998 90 …» ko'rsatiladi.
Buyurtma hech qachon jimgina yo'qolmaydi.

### ⚠️ `vercel.json` tuzatilishi shart

Hozirgi qoida barcha so'rovlarni `index.html` ga yo'naltiradi va `/api/order` ni yutadi:

```json
{ "source": "/(.*)",          "destination": "/index.html" }   ← hozir
{ "source": "/((?!api/).*)",  "destination": "/index.html" }   ← kerak
```

---

## 8. Mavjud sayt bilan bog'lash

| Joy | O'zgarish |
|---|---|
| `Header.jsx` → `primaryNav` | `{ to: "/dostavka", label: "Доставка" }` — aksentli tugma uslubida |
| `Header.jsx` → `mobileNav` | o'sha element |
| `Header.jsx` → `bottomNav` | 5 ta element saqlanadi, «Сырки» → «Доставка» (ikonka `bx-cycling`) |
| `Footer` | «Доставка на дом» havolasi |
| `/catalog/*` | Sarlavha ostiga «Заказать с доставкой» tugmasi → `/dostavka` |
| `App.jsx` → `routes` | `{ path: "/dostavka", element: <Delivery /> }`, `React.lazy` bilan |

Header'ga qidiruv maydoni, savat ikonkasi, hudud chipi **qo'shilmaydi**.

---

## 9. Bosqichlar

| # | Bosqich | Baho |
|---|---|---|
| 1 | `delivery.js` + `/dostavka` sahifasi skeleti + marshrut | 0.5 kun |
| 2 | `AddressForm`, `TimeSlotPicker` (slot mantiqi bilan), validatsiya, `localStorage` | 1 kun |
| 3 | `MapPicker` — Yandex Maps + reverse geocoding | 0.5–1 kun |
| 4 | `api/order.js` + Telegram + `vercel.json` + zaxira yo'l | 0.5 kun |
| 5 | Header/Footer/Katalog havolalari, mobil moslash, muvaffaqiyat holati | 0.5 kun |
|  | **Jami** | **~3–3.5 kun** |

Dastlabki to'liq do'kon varianti ~11–15 kun edi. Farqning katta qismi — mahsulot
modeli va 51 ta mahsulot uchun narx/tarkib ma'lumotlari.

---

## 10. Sizdan kerak bo'lgan narsalar

| # | Nima | Qachon |
|---|---|---|
| 1 | **Yetkazib berish geografiyasi:** qaysi shahar va tumanlar, yetkazish narxi, minimal buyurtma summasi | 1-bosqich |
| 2 | Ish vaqti va oxirgi buyurtma qabul qilish vaqti | 2-bosqich |
| 3 | Vaqt oraliqlari tasdiqlash (12–14, 14–16, 16–18, 18–20 — o'zgaradimi?) | 2-bosqich |
| 4 | Yandex Maps JavaScript API kaliti | 3-bosqich |
| 5 | Telegram bot token + admin guruh `chat_id` | 4-bosqich |

**Narxlar ro'yxati endi kerak emas** — bu avvalgi variantdagi eng katta blokirovkachi edi.

---

## 11. Xavflar

**Biznes tomondan:**

- **Har bir buyurtma qo'ng'iroq talab qiladi.** Narx va mavjudlik saytda yo'q.
  Operator yuklamasi buyurtma soniga to'g'ri proporsional o'sadi.
- **Erkin matn noaniq bo'ladi.** «Muzqaymoq kerak» degan buyurtmalar bo'ladi.
  Placeholder'dagi misol buni kamaytiradi, lekin yo'qotmaydi.
- **Konversiya pastroq.** Narxni ko'rmagan mijozning bir qismi formani tashlab ketadi.

**Muzqaymoq logistikasi:**

- 2 soatlik yetkazish oynasi muzqaymoq uchun **uzun**. 1 soatlik oynalar yoki
  «60 daqiqa ichida» modeli mahsulot uchun xavfsizroq — bu biznes qarori.
- Termo-qadoq / quruq muz narxi yetkazish narxiga kiritilganmi — aniqlashtirish kerak.
- Yozda yetkazish radiusi qishdan kichikroq bo'lishi mumkin.
- Erigan mahsulot qaytarilmasligi saytda yozilishi kerak.

**Texnik:**

- **Buyurtma tarixi faqat Telegramda** — qidirish, statistika, statuslar yo'q.
  Oyiga ~100 buyurtmadan oshsa baza kerak bo'ladi.
- **Telegram tushib qolsa** — 7-bo'limdagi zaxira yo'l ishlaydi.
- **Ma'lumot brauzerga bog'liq** — telefon almashtirsa saqlangan manzil yo'qoladi.
  «Ro'yxatdan o'tishsiz» variantning bilib turib qabul qilingan narxi.
- **`localStorage` incognito'da ishlamasligi mumkin** — barcha o'qish-yozish `try/catch` da.
- **Yandex Maps bundle hajmi** — faqat `/dostavka` da, `React.lazy` bilan yuklanadi.

---

## 12. Keyingi qadam

Konsepsiya tasdiqlangach, 10-bo'limdagi **1-band** (yetkazib berish geografiyasi)
kelishi bilan 1-bosqich boshlanadi. Ma'lumot hali tayyor bo'lmasa, `delivery.js` ni
namunaviy qiymatlar bilan qurib qo'yaman — haqiqiy ma'lumot kelganda faqat raqamlar
almashtiriladi, kod tayyor turadi.

---

## 16. Amalga oshirildi (2026-09-11)

**Yangi fayllar:**

| Fayl | Vazifasi |
|---|---|
| `src/constants/delivery.js` | Hududlar, slotlar, narxlar — **namunaviy qiymatlar** |
| `src/utils/delivery.js` | Telefon maskasi, slot mantiqi, profil, validatsiya, Toshkent vaqti |
| `src/utils/maps.js` | Yandex kaliti bor-yo'qligini tekshirish |
| `src/api/order.js` | Klient: `/api/order` + zaxira kanal |
| `api/order.js` | Vercel serverless funksiya → Telegram |
| `src/pages/Delivery/` | `/dostavka` sahifasi |
| `src/components/AddressForm/` | 1-bosqich: manzil |
| `src/components/TimeSlotPicker/` | 2-bosqich: kun va vaqt |
| `src/components/MapPicker/` | Yandex xarita modali (lazy) |

**O'zgartirilgan fayllar:** `src/App.jsx` (marshrut), `src/components/Header/` (3 ta
navigatsiya), `src/components/Footer/Footer.jsx`, `src/pages/Catalog/` (CTA),
`src/components/FormField/FormField.jsx` (controlled rejim + xato ko'rsatish),
`vercel.json` (`/api/` rewrite'dan chiqarildi), `vite.config.js` (dev uchun
`/api/order` middleware), `eslint.config.js` (`api/` uchun Node globallari),
`.env.example`, `CLAUDE.md`.

**Tekshirildi:** serverless funksiya (405/400/429/502, honeypot, HTML escape,
buzuq koordinata, 5000 belgili matn), slot mantiqi UTC serverda, brauzerda
to'liq oqim (validatsiya → yuborish → muvaffaqiyat → profil eslab qolinishi),
mobil ko'rinish, soat 10:00/17:00/22:00 da slot holati.

**Hali kerak (10-bo'lim):** haqiqiy hududlar va narxlar, ish vaqti, Yandex Maps
kaliti, Telegram token va `chat_id`. Ularsiz sayt ishlaydi, lekin namunaviy
Sirdaryo/Guliston qiymatlari bilan va xaritasiz.
