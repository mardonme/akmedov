import { Link } from "react-router-dom";
import Slider from "react-slick";
import Icons from "../../utils/utils";
import LogoCarousel from "../../components/LogoCarousel/LogoCarousel";
import PartnerGrid from "../../components/PartnerGrid/PartnerGrid";
import { banners } from "../../constants/banners";
import { heroSliderSettings } from "../../constants/sliders";
import OptImage from "../../components/OptImage/OptImage";
import "./Home.scss";

// Below this width the portrait banner is served. Home.scss flips the slide
// box to 9:16 at the same width — the two must stay in sync, which is why the
// swap is a <source> media query and not a JS width check: a JS check is read
// once at mount, so a resize would leave a landscape banner in a 9:16 box.
const MOBILE_BREAKPOINT = 500;

const Home = () => {
  return (
    <>
      <section className="first">
        <div className="slider-container">
          <Slider {...heroSliderSettings}>
            {banners.map((banner, idx) => (
              // Banner images load straight from /images/ (not /images/opt/),
              // so swapping a file in public/images/ updates the hero directly.
              <div key={idx} className="sliders-item">
                <picture>
                  <source
                    media={`(max-width: ${MOBILE_BREAKPOINT}px)`}
                    srcSet={banner.mobile}
                  />
                  <img
                    src={banner.desktop}
                    alt={`Banner ${idx + 1}`}
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : undefined}
                    decoding="async"
                  />
                </picture>
              </div>
            ))}
          </Slider>
          <Link to="/catalog" className="modallink">
            <p>Подробнее</p>
          </Link>
        </div>

        <div className="container first-container">
          <div className="first-container__left" data-aos="fade-right">
            <h1>Мороженое с семейной историей</h1>
            <p>
              Добро пожаловать в компанию Akhmedov!
              <br />
              <br />
              Мы делаем мороженое так, как делали бы для своих: честно, вкусно и
              с душой. Потому что для нас важно, что вы даете своей семье.
            </p>
            <Link to="/about">
              Подробнее <Icons.rightArrow />
            </Link>
          </div>
          <div className="first-container__right" data-aos="fade-left">
            <OptImage
              src="/images/choco.png"
              widths={[1400, 1024, 640]}
              sizes="(max-width: 1100px) 90vw, 600px"
              alt="Мороженое Akhmedov"
            />
          </div>
        </div>
      </section>

      <section className="second">
        <div className="container second-container">
          <div className="second-container__left">
            <h1 data-aos="fade-down">+20</h1>
            <p data-aos="fade-up">более 20 лет опыта на рынке</p>
          </div>
          <div className="second-container__right" data-aos="fade-up">
            <h3>
              Компания «Akhmedov» радует жителей Узбекистана качественным
              мороженым и глазированными сырками с 2002 года. Мы предлагаем
              тщательно отобранное качественное сырье и эксклюзивный ассортимент
              для истинных гурманов.
            </h3>
          </div>
        </div>
      </section>

      <section className="third">
        <div className="container third-container">
          <div className="third-container__up">
            <h1 data-aos="fade-right" />
            <h3 data-aos="fade-left" />
          </div>
        </div>
        <LogoCarousel />
      </section>

      <PartnerGrid />
    </>
  );
};

export default Home;
