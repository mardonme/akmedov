import { Link } from "react-router-dom";
import Slider from "react-slick";
import Icons from "../../utils/utils";
import LogoCarousel from "../../components/LogoCarousel/LogoCarousel";
import PartnerGrid from "../../components/PartnerGrid/PartnerGrid";
import { banners } from "../../constants/banners";
import { heroSliderSettings } from "../../constants/sliders";
import OptImage from "../../components/OptImage/OptImage";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <section className="first">
        <div className="slider-container">
          <Slider {...heroSliderSettings}>
            {banners.map((banner, idx) => (
              // Every banner has its own "Подробнее" drawn in, so the whole
              // slide is the link. The blurred copy behind fills whatever the
              // banner's shape leaves empty in the fixed-ratio box.
              <Link key={banner.src} to="/catalog" className="sliders-item">
                <img className="sliders-item__fill" src={banner.src} alt="" aria-hidden="true" />
                <img
                  className="sliders-item__banner"
                  src={banner.src}
                  alt={banner.alt}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : undefined}
                  decoding="async"
                />
              </Link>
            ))}
          </Slider>
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
