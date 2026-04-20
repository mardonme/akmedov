import { Link } from "react-router-dom";
import Slider from "react-slick";
import Icons from "../../utils/utils";
import LogoCarousel from "../../components/LogoCarousel/LogoCarousel";
import PartnerGrid from "../../components/PartnerGrid/PartnerGrid";
import { banners } from "../../constants/banners";
import { heroSliderSettings } from "../../constants/sliders";
import "./Home.scss";

const MOBILE_BREAKPOINT = 500;

const Home = () => {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT;

  return (
    <>
      <section className="first">
        <div className="slider-container">
          <Slider {...heroSliderSettings}>
            {banners.map((banner, idx) => (
              <div key={idx} className="sliders-item">
                <img
                  src={isMobile ? banner.mobile : banner.desktop}
                  alt={`Banner ${idx + 1}`}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
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
            <img src="/images/choco.png" alt="Мороженое Akhmedov" loading="lazy" />
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
