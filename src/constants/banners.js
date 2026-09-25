// Hero slides, in order. The images are served DIRECTLY from /images/ (not the
// optimized /images/opt/ derivatives) so a banner can be swapped just by
// replacing the file. Keep the `banner<N>.jpg` naming — scripts/prune-deploy.mjs
// only ships top-level originals that match it.
//
// Banners differ in shape (banner5 is 16:9, the others ~2.6:1). The slide box
// is a fixed wide frame and every banner is shown whole inside it, so any shape
// works without cropping — see `.sliders-item` in Home.scss.
export const banners = [
  { src: "/images/banner5.jpeg", alt: "Пломбир без сахара" },
  { src: "/images/banner6.jpg", alt: "Эскимо «Сытый дом» — два вкуса" },
  { src: "/images/banner7.jpg", alt: "Ванильный пломбир" },
];
