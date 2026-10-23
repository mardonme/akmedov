// Hero slides, in order. Point `src` at the ORIGINAL in /images/; the build
// (scripts/optimize-images.mjs) reads this list and writes responsive WebP/JPEG
// derivatives into /images/opt/, which is what <OptImage> actually serves. To
// swap a banner, replace the file (or edit this list) and run
// `npm run optimize:images` — `npm run build` does it automatically.
//
// Banners may differ in shape (banner8 is ~2.4:1, banner9 ~2.2:1). The slide
// box is a fixed wide frame and every banner is shown whole inside it, so any
// shape works without cropping — see `.sliders-item` in Home.scss.
export const banners = [
  { src: "/images/banner8.jpg", alt: "Эскимо «Сытый дом» — в шоколадной, в молочной глазури и кофейное" },
  { src: "/images/banner9.jpg", alt: "Мороженое Akhmedov — крем-брюле, ванильный и шоколадный" },
];

// Derivative widths for every banner. Never upscaled: a source narrower than
// 2400px gets its native width in the "-2400" file.
export const BANNER_WIDTHS = [2400, 1600, 800];
