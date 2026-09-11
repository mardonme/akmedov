# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint over the repo (flat config in `eslint.config.js`)

There is no test runner configured.

## Architecture

Single-page React 18 + Vite app for an ice cream brand marketing site (deployed to Vercel — see `vercel.json` for SPA rewrites). Internal package name in `package.json` is `katta-mehnat`; the working directory is `ice_cream_beta`.

### Entry and routing

- `src/main.jsx` mounts the app inside `BrowserRouter` and `InfoProvider`, and globally initializes AOS (scroll animations, 1500ms) plus Slick and Boxicons CSS.
- `src/App.jsx` defines the route table. **All page components are lazy-loaded** via `React.lazy` + `Suspense` (fallback: `PageFallback`). Unknown routes redirect to `/`.
- App is gated by a `Loader` splash on first mount — `<Loader onDismiss>` must fire before `Header`/`<Routes>`/`Footer` render. Don't bypass this without intent; it's the intro experience.

### State

- One global context: [src/context/infoContext.jsx](src/context/infoContext.jsx). Exposes `currentUser` (rehydrated from `localStorage.profile`), `setCurrentUser`, `update`/`setUpdate`, and a shared `scroll` ref that auto-scrolls into view whenever `update` toggles. There is no Redux/Zustand.
- Page-level state lives inside each page component under `src/pages/<Name>/`.

### Data and constants

- Static site content (banners, brands, contacts, history, mission, partners, products, sliders) lives in `src/constants/*.js` and is imported directly by pages/components. **When content needs to change, edit these files** rather than introducing a CMS.
- API calls go through [src/api/client.js](src/api/client.js): an axios instance with `baseURL = import.meta.env.VITE_API_URL || "https://olx-server-omega.vercel.app/api"` and 15s timeout. `submitContactForm` → `POST /message/submit` ([src/api/contact.js](src/api/contact.js)).
- The delivery form does **not** use `apiClient` — it posts same-origin to `/api/order` ([src/api/order.js](src/api/order.js)), which is this repo's own serverless function. See "Delivery" below.

### UI conventions

- Components follow a one-folder-per-component pattern under `src/components/<Name>/` (typically `<Name>.jsx` + `<Name>.scss`). Pages mirror this under `src/pages/<Name>/`.
- Styling is **Sass (`.scss`)** colocated with each component/page, plus Bootstrap 5 + react-bootstrap utility classes. Global resets/variables live in `src/App.css`.
- Icon libraries in active use: `boxicons` (web component + CSS), `react-icons`. Carousels use `react-slick` (CSS imported globally in `main.jsx`).
- Animations use AOS data attributes — initialized once globally, so just add `data-aos="..."` in JSX.

### Routing map

`/` Home · `/made` Made · `/history` History · `/buy` WhereToBuy · `/about` About · `/catalog/icecream` + `/catalog/syroki` Catalog · `/contact` Contact · `/dostavka` Delivery. Add new routes in the `routes` array in [src/App.jsx](src/App.jsx) and a matching lazy import.

### Delivery (`/dostavka`)

An order-intake form, deliberately **not** a shop: no cart, no product cards, no
search, no prices. The customer gives an address, a delivery window and a
free-text list of what to bring; the order lands in an admin Telegram group and
an operator calls back to confirm the total. Payment is cash on delivery.
Rationale and trade-offs: [docs/dostavka-concept.md](docs/dostavka-concept.md).

- **Config** — [src/constants/delivery.js](src/constants/delivery.js): zones,
  districts, fees, minimum order, lead time and time slots. These are still
  placeholder values pending real numbers from the company. Nothing hard-codes a
  zone or a slot anywhere else, so this is the only file to edit.
- **Logic** — [src/utils/delivery.js](src/utils/delivery.js): phone masking,
  slot availability, the localStorage profile and `validateOrder`. It is
  React-free and imported by the serverless function too, so the same rules run
  on both sides; that is also why its imports carry explicit `.js` extensions.
- **Timezone** — never use the host clock for slot logic. Vercel runs in UTC and
  a customer's device can be set to anything, so everything goes through
  `tashkentNow()`.
- **Endpoint** — [api/order.js](api/order.js) re-validates, formats an HTML
  message and posts to the Telegram Bot API. Env: `TELEGRAM_BOT_TOKEN`,
  `TELEGRAM_CHAT_ID` — **no `VITE_` prefix**, or the token ships to the browser.
- **`vercel.json` rewrite** — the SPA catch-all is `"/((?!api/).*)"`. Restoring a
  plain `"/(.*)"` would swallow `/api/order` and silently break every order.
- **Local dev** — Vite knows nothing about `/api`, so
  [vite.config.js](vite.config.js) mounts the handler as dev middleware. Without
  Telegram credentials it runs dry: the message is printed to the dev-server
  terminal instead of being sent.
- **Map** — `VITE_YANDEX_MAPS_KEY` is optional. Without it the "указать на карте"
  button is hidden and the form works by hand; `MapPicker` is lazy-loaded so the
  Yandex script costs nothing to everyone else.
- **Fallback** — if `/api/order` or Telegram is down the order is re-sent through
  the existing `/message/submit` contact endpoint and the customer is shown the
  phone number. An order should never disappear silently.
