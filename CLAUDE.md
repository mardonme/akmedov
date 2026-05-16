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
- API calls go through [src/api/client.js](src/api/client.js): an axios instance with `baseURL = import.meta.env.VITE_API_URL || "https://olx-server-omega.vercel.app/api"` and 15s timeout. Currently the only endpoint is `submitContactForm` → `POST /message/submit` ([src/api/contact.js](src/api/contact.js)).

### UI conventions

- Components follow a one-folder-per-component pattern under `src/components/<Name>/` (typically `<Name>.jsx` + `<Name>.scss`). Pages mirror this under `src/pages/<Name>/`.
- Styling is **Sass (`.scss`)** colocated with each component/page, plus Bootstrap 5 + react-bootstrap utility classes. Global resets/variables live in `src/App.css`.
- Icon libraries in active use: `boxicons` (web component + CSS), `react-icons`. Carousels use `react-slick` (CSS imported globally in `main.jsx`).
- Animations use AOS data attributes — initialized once globally, so just add `data-aos="..."` in JSX.

### Routing map

`/` Home · `/made` Made · `/history` History · `/buy` WhereToBuy · `/about` About · `/catalog` Catalog · `/contact` Contact. Add new routes in the `routes` array in [src/App.jsx](src/App.jsx) and a matching lazy import.
