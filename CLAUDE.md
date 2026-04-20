# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — produce a production build in `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run lint` — run ESLint over the repo

There is no test suite configured in `package.json`.

## Architecture

This is a Vite + React 18 single-page marketing site (Russian UI) for an ice cream / dairy brand. The `package.json` name is `katta-mehnat`, but the user-facing site is "Madaniy Hayot".

### Entry and routing

- [src/main.jsx](src/main.jsx) wraps the app in `BrowserRouter` → `InfoProvider`, initializes AOS (1500 ms) globally, and imports slick-carousel and boxicons CSS once at the top level. Page components rely on these side-effect imports being in place.
- [src/App.jsx](src/App.jsx) gates the whole app behind a `Loader` splash — until `open` flips to true via `Loader`'s `click` prop, the router tree is not rendered. After that it renders `Header` + `<Routes>` + `Footer`.
- Routes live directly in `App.jsx`: `/`, `/made`, `/history`, `/buy`, `/about`, `/catalog`, `/contact`. The catch-all currently redirects to `/` (the `NotFound` component is imported but its route is commented out).
- Client-side routing requires SPA fallback in hosting. Both [vercel.json](vercel.json) (Vercel rewrite) and [public/_redirects](public/_redirects) (Netlify) are present — keep them in sync when adding routes.

### Global state

[src/context/infoContext.jsx](src/context/infoContext.jsx) exposes `useInfoContext()` and an `InfoProvider` that holds:

- `currentUser` / `setCurrentUser` — hydrated from `localStorage.profile` on mount.
- `update` / `setUpdate` — toggling this triggers a `scrollIntoView` on `scroll.current`.
- `scroll` — a ref attached to `<header>` in [src/components/Header/Header.jsx](src/components/Header/Header.jsx); flipping `update` scrolls the page back to the header. This is the canonical way to "scroll to top" in this app — do not add separate `window.scrollTo` calls.

### Styling

Each page and component is colocated with its own SCSS file (e.g. [src/pages/Home/Home.scss](src/pages/Home/Home.scss), [src/components/Header/Header.scss](src/components/Header/Header.scss)) and imported directly from the JSX file. Global styles live in [src/App.css](src/App.css). Bootstrap, react-bootstrap, boxicons, AOS, and slick-carousel are all available — prefer those over adding new UI libraries.

### External integrations

The only backend call is in [src/pages/Contact/Contact.jsx](src/pages/Contact/Contact.jsx), which POSTs form submissions to `https://olx-server-omega.vercel.app/api/message/submit` via axios. There is no API layer or `.env` — the URL is hard-coded.

### Static assets

Images and extras are served from [public/images/](public/images/) and [public/pribambas/](public/pribambas/) and referenced by absolute paths (e.g. `/images/logo.png`). Do not import them through the module graph.

## Conventions

- JSX-only codebase (`.jsx`); no TypeScript.
- Page folders use `PascalCase/PascalCase.jsx` + `PascalCase.scss`. Match this layout when adding new pages, and register the route in `App.jsx`.
- UI copy is Russian. Preserve existing Cyrillic strings when refactoring.
