export const heroSliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2500,
  cssEase: "linear",
  arrows: false,
  pauseOnHover: false,
};

export const logoCarouselSettings = {
  infinite: true,
  slidesToShow: 8,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 1000,
  cssEase: "linear",
  arrows: false,
  pauseOnHover: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 6 } },
    { breakpoint: 800, settings: { slidesToShow: 4 } },
    { breakpoint: 530, settings: { slidesToShow: 2 } },
  ],
};

export const logoCarouselSettingsRtl = {
  ...logoCarouselSettings,
  rtl: true,
};
