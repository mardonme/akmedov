import "./Home.scss";
import Icons from "../../utils/utils";
import Slider from "react-slick";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const handleSelect = (selectedIndex) => {
  setIndex(selectedIndex);
};

const Home = () => {
  const settings1 = {
    infinite: true, // Бесконечное вращение
    slidesToShow: 8, // Одновременно показывать 8 слайдов
    autoplay: true, // Автоматическое вращение
    speed: 1000,
    autoplaySpeed: 1000,
    cssEase: "linear", // Линейная анимация
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const settings2 = {
    rtl: true,
    infinite: true, // Бесконечное вращение
    slidesToShow: 8, // Одновременно показывать 8 слайдов
    autoplay: true, // Автоматическое вращение
    speed: 1000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };
  return (
    <>
      <section className="first">
        <div className="slider-container">
          <Slider {...settings}>
            <div className="sliders-item">
              <img src={window.innerWidth <= 500 ? "images/mobile1.JPG" : "images/banner1.JPG"} alt="" />{" "}
              {/* <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum distinctio ipsa debitis similique possimus fuga voluptates necessitatibus veniam, consectetur incidunt!</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quaerat!</p> */}
            </div>
            <div className="sliders-item">
              <img src={window.innerWidth <= 500 ? "images/mobile2.JPG" : "images/banner2.JPG"} alt="" />{" "}
              {/* <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum distinctio ipsa debitis similique possimus fuga voluptates necessitatibus veniam, consectetur incidunt!</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quaerat!</p> */}
            </div>
            <div className="sliders-item">
              <img src={window.innerWidth <= 500 ? "images/mobile3.JPG" : "images/banner3.JPG"} alt="" />{" "}
              {/* <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum distinctio ipsa debitis similique possimus fuga voluptates necessitatibus veniam, consectetur incidunt!</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quaerat!</p> */}
            </div>
            <div className="sliders-item">
              <img src={window.innerWidth <= 500 ? "images/mobile4.JPG" : "images/banner4.JPG"} alt="" />{" "}
              {/* <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum distinctio ipsa debitis similique possimus fuga voluptates necessitatibus veniam, consectetur incidunt!</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quaerat!</p> */}
            </div>
          </Slider>
          <Link to="/catalog" className="modallink">
            <p>Подробнее</p>
          </Link>
        </div>
        {/* <Carousel activeIndex={index} onSelect={handleSelect}>
          {Array.from({ length: 16 }).map((_, idx) => (
            <Carousel.Item key={idx}>
              <div className="img-box" style={{ textAlign: "center" }}>
                <img
                  src="images/banner1.JPG"
                  alt={`Slide ${idx + 1}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel> */}
        {/* <img src="images/banner1.JPG" alt="" />{" "} */}
        <div className="container first-container">
          <div className="first-container__left" data-aos="fade-right">
            <h1>Мороженое с семейной историей</h1>
            <p>
              Добро пожаловать в компанию Akhmedov!
              <br />
              <br />
              Мы делаем мороженое так как делали бы для своих: честно, вкусно и
              с душой. Потому что для нас важно, что вы даете своей семье.
            </p>
            <a href="/about">
              Подробнее <Icons.rightArrow />
            </a>
          </div>
          <div className="first-container__right" data-aos="fade-left">
            <img src="/images/choco.png" alt="Герой" />
          </div>
        </div>
      </section>

      <section className="second">
        <div className="container second-container">
          <div className="second-container__left">
            <h1 data-aos="fade-down">{"+20"} </h1>
            <p data-aos="fade-up">
              более 20 лет опыта на рынке <br />
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
            <h1 data-aos="fade-right">{""} </h1>
            <h3 data-aos="fade-left"></h3>
          </div>
        </div>
        <div data-aos="fade-up" className="third-container__down">
          <Slider {...settings1}>
            {/* Слайды */}
            {Array.from({ length: 16 }).map((_, index) => (
              <div className="img-box" key={index}>
                <img src="/images/logo.png" alt={`Слайд ${index + 1}`} />
              </div>
            ))}
          </Slider>
          <Slider {...settings2}>
            {/* Слайды */}
            {Array.from({ length: 16 }).map((_, index) => (
              <div className="img-box" key={index}>
                <img src="/images/logo.png" alt={`Слайд ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="fourth">
        <div className="container fourth-container">
          <div className="fourth-container__title">
            <h1 data-aos="fade-right">Наши партнеры </h1>
          </div>
          <div data-aos="fade-up" className="fourth-container__wrapper">
            <a>
              <img src="/images/part.png" alt="Slide 1" />
            </a>
            <a>
              <img src="/images/part1.png" alt="Slide 1" />
            </a>
            <a>
              <img src="/images/part2.png" alt="Slide 1" />
            </a>
            <a>
              <img src="/images/part3.png" alt="Slide 1" />
            </a>
            <a>
              <img src="/images/part.jpg" alt="Slide 1" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
