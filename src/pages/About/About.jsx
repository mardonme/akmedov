import { Link } from "react-router-dom";
import LogoCarousel from "../../components/LogoCarousel/LogoCarousel";
import PartnerGrid from "../../components/PartnerGrid/PartnerGrid";
import { brands } from "../../constants/brands";
import { timelineHighlights } from "../../constants/history";
import { missionPoints } from "../../constants/mission";
import "./About.scss";

const heroParagraphs = [
  "Компания Akhmedov не просто про мороженое - это история. Это путь. Вкус, за которым стоит забота, честный труд и вера в доброе. Бренд Akhmedov был основан семьей из Ташкента, но наше сердце - в Сырдарье. Именно там находится наше производство, где живут и трудятся невероятные, теплые люди.",
  "Покупая Akhmedov, вы не только наслаждаетесь вкусом, но и становитесь частью большего. Вы поддерживаете семьи, создаете рабочие места и вместе с нами развиваете регион, в который мы вложили душу. Каждое ваше прикосновение к нашему бренду - это вклад в теплую и искреннюю историю, которую мы пишем вместе.",
  "«Akhmedov» — это больше, чем просто десерты. Мы создаем мороженое и глазированные сырки с любовью к традициям и вниманием к деталям. Только качественные ингредиенты, современные технологии и неповторимый вкус, который запоминается с первой ложки.",
];

const About = () => (
  <div className="container">
    <section className="second">
      <div className="second-box">
        <div className="second-box__left">
          {heroParagraphs.map((text, idx) => (
            <h2 key={idx} data-aos="fade-up">
              {text}
            </h2>
          ))}
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

    <section className="holding" data-aos="fade-up">
      <h1 className="abouth1">НАШИ БРЕНДЫ</h1>
      <div className="box holding-box">
        <div className="holding-box__wrapper">
          {brands.map((brand, idx) => (
            <div key={idx} className="holding-box__wrapper__item">
              <img src={brand.img} alt={brand.alt} loading="lazy" />
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

    <section className="third">
      <div className="container third-container">
        <div className="third-container__up">
          <h1 data-aos="fade-right" />
          <h3 data-aos="fade-left" />
        </div>
      </div>
      <LogoCarousel />
    </section>

    <section className="box section section--bg_1 mission">
      <div className="section-top anim active">
        <h2 className="title title--size_s">Наша миссия</h2>
      </div>
      <div className="mission-inner">
        <div className="mission-image anim anim--image active">
          <picture>
            <img
              className="lazyload"
              src="/images/krizymaxabout.jpg"
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

    <section className="history">
      <div className="history-title">
        <h2>История компании</h2>
        <Link to="/history">
          Подробнее <i className="bx bx-right-arrow-alt" />
        </Link>
      </div>
      <div className="timeline">
        {timelineHighlights.map((item) => (
          <div key={item.year} className="timeline-item">
            <div className="circle">{item.year}</div>
            <div className="content">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <PartnerGrid />
  </div>
);

export default About;
