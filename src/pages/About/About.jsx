import "./About.scss";
import Slider from "react-slick";
import React, { useRef, useState, memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

// Memoized FAQ Item component
const FAQItem = memo(({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  
  const toggleOpen = useCallback(() => setOpen(prev => !prev), []);
  
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={toggleOpen} aria-expanded={open}>
        {question}
        <span className="faq-icon" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div
        ref={contentRef}
        className={`faq-answer ${open ? "open" : ""}`}
        style={open ? { height: contentRef.current?.scrollHeight } : { height: 0 }}
      >
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
});

FAQItem.displayName = 'FAQItem';

const About = () => {
  // Memoized slider settings
  const sliderSettings1 = useMemo(() => ({
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

  const sliderSettings2 = useMemo(() => ({
    ...sliderSettings1,
    rtl: true
  }), [sliderSettings1]);

  // Static data - memoized
  const historyData = useMemo(() => [
    {
      year: "2002",
      text: "Первое частное предприятие 'Akhmedov'. Началось производство мороженого «ЕЩЁ» в пластиковых стаканчиках.",
    },
    {
      year: "2007",
      text: "Основана компания «ООО САБЕ». Запущено производство мороженого «Kreasy Max», ставшего хитом.",
    },
    {
      year: "2014",
      text: "Представлено эскимо 'Бомбей' – классическое мороженое на палочке.",
    },
    {
      year: "2017",
      text: "Создан бренд 'Сытый Дом', начато производство полуфабрикатов.",
    },
    {
      year: "2020",
      text: "Расширен ассортимент 'Сытый Дом' – теперь бренд выпускает и мороженое.",
    },
    {
      year: "2023",
      text: "Провели ребрендинг и объединили всё производство под новым, сильным именем — Akhmedov. Это не просто новое название, а символ качества, вкуса и доверия, которое мы заслуживали годами.",
    },
  ], []);

  const brands = useMemo(() => [
    { img: "images/logo.png", alt: "Akhmedov" },
    { img: "images/kreasymaxabout.jpg", alt: "Kreasy Max" },
    { img: "images/СЫТЫЙ_ДОМ.jpg", alt: "Сытый Дом" },
    { img: "images/Bombey.jpg", alt: "Bombey" }
  ], []);

  const partners = useMemo(() => [
    { img: "/images/part.png", alt: "Партнер 1" },
    { img: "/images/part1.png", alt: "Партнер 2" },
    { img: "/images/part2.png", alt: "Партнер 3" },
    { img: "/images/part3.png", alt: "Партнер 4" },
    { img: "/images/part.jpg", alt: "Партнер 5" }
  ], []);

  const missionPoints = useMemo(() => [
    "Создавать натуральное и качественное мороженое, даря людям радость в каждом вкусе.",
    "Мы используем только отборное сырье и разрабатываем эксклюзивный ассортимент, чтобы каждый мог найти свое идеальное лакомство.",
    "Наша цель – сочетать традиции и инновации, предлагая продукт, который радует и вдохновляет."
  ], []);

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="second">
        <div className="second-box">
          <div className="second-box__left">
            <h2 data-aos="fade-up">
              Компания Akhmedov не просто про мороженое - это история. Это путь.
              Вкус, за которым стоит забота, честный труд и вера в доброе. Бренд
              Akhmedov был основан семьей из Ташкента, но наше сердце - в
              Сырдарье. Именно там находится наше производство, где живут и
              трудятся невероятные, теплые люди.
            </h2>
            <h2 data-aos="fade-up">
              Покупая Akhmedov, вы не только наслаждаетесь вкусом, но и
              становитесь частью большего. Вы поддерживаете семьи, создаете
              рабочие места и вместе с нами развиваете регион, в который мы
              вложили душу. Каждое ваше прикосновение к нашему бренду - это
              вклад в теплую и искреннюю историю, которую мы пишем вместе.
            </h2>
            <h2 data-aos="fade-up">
              «Akhmedov» — это больше, чем просто десерты. Мы создаем мороженое
              и глазированные сырки с любовью к традициям и вниманием к деталям.
              Только качественные ингредиенты, современные технологии и
              неповторимый вкус, который запоминается с первой ложки.
            </h2>
          </div>
          <div className="second-box__right" data-aos="fade-up">
            <img 
              src="/images/abouthed.jpg" 
              alt="О компании Akhmedov" 
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="holding" data-aos="fade-up">
        <h1 className="abouth1">НАШИ БРЕНДЫ</h1>
        <div className="box holding-box">
          <div className="holding-box__wrapper">
            {brands.map((brand, idx) => (
              <div key={idx} className="holding-box__wrapper__item">
                <img 
                  src={brand.img} 
                  alt={brand.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="holding-box__description">
            <h1>Наши бренды</h1>
            <p>
              Компания предлагает широкий ассортимент мороженого и глазированных 
              сырков под четырьмя популярными брендами. Каждый бренд создан с 
              любовью к качеству и уникальному вкусу.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Carousel */}
      <section className="third">
        <div className="container third-container">
          <div className="third-container__up">
            <h1 data-aos="fade-right">{""}</h1>
            <h3 data-aos="fade-left"></h3>
          </div>
        </div>
        <div data-aos="fade-up" className="third-container__down">
          <Slider {...sliderSettings1}>
            {Array.from({ length: 16 }).map((_, index) => (
              <div className="img-box" key={`logo1-${index}`}>
                <img 
                  src="/images/logo.png" 
                  alt="Akhmedov Logo" 
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
          <Slider {...sliderSettings2}>
            {Array.from({ length: 16 }).map((_, index) => (
              <div className="img-box" key={`logo2-${index}`}>
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

      {/* Mission Section */}
      <section className="box section section--bg_1 mission">
        <div className="section-top anim active">
          <h2 className="title title--size_s">Наша миссия</h2>
        </div>
        <div className="mission-inner">
          <div className="mission-image anim anim--image active">
            <picture>
              <img 
                className="lazyload" 
                src="images/krizymaxabout.jpg" 
                alt="Наша миссия"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="mission-content">
            <ul className="mission-list anim-parent anim-parent--right">
              {missionPoints.map((point, idx) => (
                <li key={idx} className="mission-list__item active">
                  <span className="mission-list__count">0{idx + 1}</span>
                  <div className="mission-list__content">{point}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="history">
        <div className="history-title">
          <h2>История компании</h2>
          <Link to="/history">
            Подробнее <i className="bx bx-right-arrow-alt"></i>
          </Link>
        </div>
        <div className="timeline">
          {historyData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="circle">{item.year}</div>
              <div className="content">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
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
    </div>
  );
};

export default About;