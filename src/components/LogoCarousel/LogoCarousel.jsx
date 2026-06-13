import Slider from "react-slick";
import {
  logoCarouselSettings,
  logoCarouselSettingsRtl,
} from "../../constants/sliders";
import OptImage from "../OptImage/OptImage";
import "./LogoCarousel.scss";

const LOGO_COUNT = 16;
const logos = Array.from({ length: LOGO_COUNT });

const LogoRow = ({ rtl = false, idPrefix }) => (
  <Slider {...(rtl ? logoCarouselSettingsRtl : logoCarouselSettings)}>
    {logos.map((_, index) => (
      <div className="img-box" key={`${idPrefix}-${index}`}>
        <OptImage src="/images/logo.png" alt="Akhmedov Logo" />
      </div>
    ))}
  </Slider>
);

const LogoCarousel = () => (
  <div data-aos="fade-up" className="third-container__down">
    <LogoRow idPrefix="logo-ltr" />
    <LogoRow rtl idPrefix="logo-rtl" />
  </div>
);

export default LogoCarousel;
