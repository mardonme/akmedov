import "./Home.scss";
import Icons from "../../utils/utils";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const Home = () => {
  const isMobile = window.innerWidth <= 500;

  // Memoized slider settings
  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2500,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false
  }), []);

  const settings1 = useMemo(() => ({
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
      { breakpoint: 530, settings: { slidesToShow: 2 } }
    ]
  }), []);

  const settings2 = useMemo(() => ({
    ...settings1,
    rtl: true
  }), [settings1]);

  // Banner images
  const banners = useMemo(() => [
    { mobile: "images/mobile1.JPG", desktop: "images/banner1.JPG" },
    { mobile: "images/mobile2.JPG", desktop: "images/banner2.JPG" },
    { mobile: "images/mobile3.JPG", desktop: "images/banner3.JPG" },
    { mobile: "images/mobile4.JPG", desktop: "images/banner4.JPG" }
  ], []);

  // Partners data
  const partners = useMemo(() => [
    { img: "/images/part.png", alt: "Partner 1" },
    { img: "/images/part1.png", alt: "Partner 2" },
    { img: "/images/part2.png", alt: "Partner 3" },
    { img: "/images/part3.png", alt: "Partner 4" },
    { img: "/images/part.jpg", alt: "Partner 5" }
  ], []);

  return (
    <>
      <section className="first">
        <div className="slider-container">
          <Slider {...sliderSettings}>
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
              <br /><br />
              Мы делаем мороженое так как делали бы для своих: честно, вкусно и
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
            <h1 data-aos="fade-down">{"+20"}</h1>
            <p data-aos="fade-up">
              более 20 лет опыта на рынке
            </p>
          </div>
          <div className="second-container__right" data-aos="fade-up">
            <h3>
              Компания «Akhmedov» радует жителей Узбекистана качественным
              мороженым и глазированными сырками с 2002 года. Тщательно
              отобранное качественное сырье и эксклюзивный ассортимент для
              истинных гурманов.
            </h3>
          </div>
        </div>
      </section>

      <section className="third">
        <div className="container third-container">
          <div className="third-container__up">
            <h1 data-aos="fade-right">{""}</h1>
            <h3 data-aos="fade-left"></h3>
          </div>
        </div>
        <div data-aos="fade-up" className="third-container__down">
          <Slider {...settings1}>
            {Array.from({ length: 16 }).map((_, index) => (
              <div className="img-box" key={index}>
                <img 
                  src="/images/logo.png" 
                  alt="Akhmedov Logo" 
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
          <Slider {...settings2}>
            {Array.from({ length: 16 }).map((_, index) => (
              <div className="img-box" key={index}>
                <img 
                  src="/images/logo.png" 
                  alt="Akhmedov Logo" 
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="fourth">
        <div className="container fourth-container">
          <div className="fourth-container__title">
            <h1 data-aos="fade-right">Наши партнеры</h1>
          </div>
          <div data-aos="fade-up" className="fourth-container__wrapper">
            {partners.map((partner, idx) => (
              <a key={idx}>
                <img 
                  src={partner.img} 
                  alt={partner.alt} 
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;