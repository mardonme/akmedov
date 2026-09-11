/**
 * Yandex Maps availability. Lives outside MapPicker so that module exports a
 * component and nothing else (fast refresh), and outside utils/delivery.js
 * because that one is also imported by the Node serverless function, where
 * import.meta.env does not exist.
 */
export const YANDEX_MAPS_KEY = import.meta.env.VITE_YANDEX_MAPS_KEY ?? "";

/** Without a key the Yandex script 403s, so the page hides the map button and
 *  the form stays usable by hand. */
export const isMapAvailable = () => Boolean(YANDEX_MAPS_KEY);
