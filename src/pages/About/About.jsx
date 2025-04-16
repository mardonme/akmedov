import "./About.scss";
import Slider from "react-slick";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {question}
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      <div
        ref={contentRef}
        className={`faq-answer ${open ? "open" : ""}`}
        style={
          open ? { height: contentRef.current.scrollHeight } : { height: 0 }
        }
      >
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
};

const About = () => {
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

  const historyData = [
    {
      year: "2002",
      text: "Первое частное предприятие 'Akhmedov'. Началось производство мороженого «ЕЩЁ» в пластиковых стаканчиках.",
    },
    {
      year: "2007",
      text: "Основана компания 'ООО САБЕ'. Запущено производство мороженого 'Kreasy Max', ставшего хитом.",
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
  ];
  const [visibleIndex, setVisibleIndex] = useState(0);
  const interval = setInterval(() => {
    setVisibleIndex((prevIndex) => (prevIndex + 1) % historyData.length);
  }, 3000); // Har 3 sekundda almashadi
  const data = [
    {
      question: "1992 год",
      answer:
        "История создания комрании Akhmedov История компании Akhmedov - это история семьи, преданности делу и честного труда. Основателями бизнеса стали братья Батыр Akhmedov и Бахадыр Akhmedov. Именно они сделали первый шаг, с которого и начиналось все: от одной морозильной камеры - до крупнейшего производителя мороженого. Бизнес компании Akhmedov начал свое существование в 1992 году с простой, но перспективной идеи - перепродажи мороженого. На тот момент не было ни планов, ни намерений производить продукт самостоятельно. Все начиналось с покупки одной морозильной камеры, из которой и велась продажа мороженого на базаре в куйлюке - одном из оживленных рынков Ташкента.С течением времени бизнес начал постепенно расти. Количество морозильных ларей увеличивалось: сначала три, потом шесть, восемь и больше. Продажи шли активно, и спустя время на улице Ташкента поставили большой морозильный контейнер, рядом с которым был установлен вагончик. Из этого вагончика осуществлялась продажа мороженого как оптом, так и поштучно. Все шло полным ходом, спрос был высоким и дела шли отлично.",
    },
    {
      question: "1997 год",
      answer:
        "Компания приобрела свое первое коммерческое помещение на Куйлюке - именно там открылась полноценная оптовая точка, которая, несмотря на прошедшие десятилетия, до сих пор существует и продолжает работать.",
    },
    {
      question: "2001 год",
      answer:
        "Начался импорт мороженого из  России. Компания сотрудничала с такими производителями, как «Inmarko”, “Шин-лайн» «Альтервест», а также начала завозить в Узбекистан различные компоненты для мороженого - стабилизаторы , сырье и другие ингредиенты.",
    },
    {
      question: "2002 год",
      answer:
        "Однако до определенного момента идея собственного производства даже не рассматривалась. Все изменилось в 2002 году, когда было принято решение открыть свой цех. Именно тогда началось собственное производство мороженого. Первые партии производились в пластиковых стаканчиках. Продукция продавалась по всему Ташкенту, а со временем начала активно распростроняться по регионам Узбекистана. Мороженое компании появилось во всех 12 областях страны.",
    },
    {
      question: "2005 год",
      answer:
        "В 2005 году бизнес продолжал стремительно развиваться. Именно тогда в Сырдарьинской области началось строительство полноценного завода по производству мороженого. С тех пор продукция компании Akhmedov уверенно занимает свое место на рынке, представлена по всему Ташкенту и во всех регионах страны.",
    },
    {
      question: "2007 год",
      answer:
        "В 2007 году была основана компания ООО «САБЕ» и именно  тогда стартовало производство легендарного мороженого “Kreasy max”, который стал настоящей визитной карточкой компании - это мороженое до сих пор считается вкусом детства для многих жителей Узбекистана.",
    },
    {
      question: "2014 год",
      answer:
        "В 2014 году компания представила новый продукт - эскимо Bombey, классика на палочке сочетающая вкус и качество.  Эскимо Bombey - классика проверенная временем! Впервые появилось в 2014 году и с тех пор не покидает прилавки оставаясь любимым лакомством для тысячи людей. За эти годы оно завоевало свою большую и преданную аудиторию - тех кто ценит насыщенный вкус, качественные ингредиенты и тот самый хруст, который невозомжно забыть.",
    },
    {
      question: "2017 год",
      answer:
        "В 2017 году был создан бренд «Сытый Дом» и компания начала выпуск полуфабрикатов. Производство этой линейки ведется в отдельном цехе и стало еще одним шагом к расширению ассортимента.",
    },
    {
      question: "2020 год",
      answer:
        "В 2020 году ассортимент сытый дом был дополнен новой категорией - теперь под этим именем также выпускается мороженое.Помимо мороженого и полуфабрикатов, компания Akhmedov радует  своих покупателей еще одной изысканной продукцией - фирменными творожными сырками  премиум класса.      Каждый сырок - это тщательно продуманный продукт, созданный исключительно  из натурального молока, качественного сливочного масла и бельгийского шоколада. Идеально сбалансированная глазурь, нежная сливочная текстура и богатые начинки превращают обычный  десерт в настоящее гастрономическое удовольствие.Ягодные пюре, карамельные наполнители, шоколадные акценты - все это делает сырки Akhmedov особенными. Это не просто лакомство - это выбор тех, кто ценит вкус, качество и эстетику в каждой детали",
    },
    {
      question: "2021 - 2023 год",
      answer:
        "В 2021 году к семейному бизнесу присоединилось новое поколение: Камола Akhmedovа  и Сарвар Akhmedov, дети Батыра Akhmedovа. Сохраняя традиции, они принесли в дело новую энергию, свежие идеи и современный взгляд на развитие бренда. Сегодня компания Akhmedov продолжает расти и развиваться, оставаясь верной своим корням и принципам.А в 2023 году компания провела масштабный ребрендинг,  обьединив все производство под одним сильным  и узнаваемым именем - Akhmedov. Это стало не просто сменой названия, а символом качества, вкуса и доверия , которое комания заслуживала годами, честным трудом, ценя вашу поддержку и любовь. Компания Akhmedov - это не просто про бизнес. Это семейная история построенная на поддержке, любви и вере семьи Akhmedovых. С самого первого поколения и до сегодняшнего дня - все что создается под этим именем передается из поколения в поколение как настоящая семейная реликвия. Домашние рецепты , фирменные технологии, уникальные вкусы, бренды и ценности - все это бережно сохраняется и передается следующему поколению,  с искренним желанием радовать людей. Мы гордимся тем, что за каждой упаковкой нашей продукции стоит душа семьи.",
    },
  ];

  // return () => clearInterval(interval);
  return (
    <div className="container">
      {/* Первая страница */}
      <section className="second">
        <div className="second-box">
          <div className="second-box__left">
            <h2 data-aos="fade-up">
              Компания Akhmedov не просто про мороженое - это история. Это путь.
              Вкус за которым стоит забота, честный труд и вера в доброе. Бренд
              Akhmedov был основан семьей из Ташкента, но наше сердце - в
              Сырдарье. Именно там находится наше производство, где живут и
              трудятся невероятные, теплые люди.
              <br />
            </h2>
            <h2 data-aos="fade-up">
              Покупая Akhmedov, вы не только наслаждайтесь вкусом, но и
              становитесь частью большего. Вы поддерживаете семьи, создаете
              рабочие места и вместе с нами развиваете регион, в который мы
              вложили душу. Каждое ваше прикосновение к нашему бренду - это
              вклад в теплую и искреннюю историю, которую мы пишем вместе.
              <br />
            </h2>
            <h2 data-aos="fade-up">
              «Akhmedov» — это больше, чем просто десерты. Мы создаем мороженое
              и глазированные сырки с любовью к традициям и вниманием к деталям.
              Только качественные ингредиенты, современные технологии и
              неповторимый вкус, который запоминается с первой ложки.
              <br />
            </h2>
          </div>
          <div className="second-box__right" data-aos="fade-up">
            <img src="/images/abouthed.jpg" alt="" />
          </div>
        </div>
      </section>

      {/* О компании */}
      <section className="holding" data-aos="fade-up">
        <h1 className="abouth1">НАШИ БРЕНДЫ</h1>
        <div className="box holding-box">
          <div className="holding-box__wrapper">
            <div className="holding-box__wrapper__item">
              <img src="images/logo.png" alt="" />
            </div>
            <div className="holding-box__wrapper__item">
              <img src="images/kreasymaxabout.jpg" alt="" />
            </div>
            <div className="holding-box__wrapper__item">
              <img src="images/СЫТЫЙ_ДОМ.jpg" alt="" />
            </div>
            <div className="holding-box__wrapper__item">
              <img src="images/Bombey.jpg" alt="" />
            </div>
            {/* <div className="holding-box__wrapper__item">
              <img src="images/brendlogo1.png" alt="" />
            </div>
            <div className="holding-box__wrapper__item">
              <img src="images/brendlogo2.png" alt="" />
            </div> */}
          </div>
          <div className="holding-box__description">
            <h1>Наши бренды</h1>
            <p>
              {`Компания предлагает широкий ассортимент мороженого и глазированных сырков под четырьмя популярными брендами. Каждый бренд создан с любовью к качеству и уникальному вкусу`}
            </p>
            {/* <a href="/">
        структура холдинга <Icons.rightArrow />
      </a> */}
          </div>
        </div>
      </section>

      {/* Бренды */}
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

      {/* Наша миссия */}
      <section className="box section section--bg_1 mission">
        <div className="section-top anim active">
          <h2 className="title title--size_s">Наша миссия</h2>
        </div>
        <div className="mission-inner">
          <div className="mission-image anim anim--image active">
            <picture>
              <img className="lazyload" src="images/krizymaxabout.jpg" />
            </picture>
          </div>
          <div className="mission-content">
            <ul className="mission-list anim-parent anim-parent--right">
              <li className="mission-list__item active">
                <span className="mission-list__count">01</span>
                <div className="mission-list__content">
                  Создавать натуральное и качественное мороженое, даря людям
                  радость в каждом вкусе.
                </div>
              </li>
              <li className="mission-list__item active">
                <span className="mission-list__count">02</span>
                <div className="mission-list__content">
                  Мы используем только отборное сырье и разрабатываем
                  эксклюзивный ассортимент, чтобы каждый мог найти свое
                  идеальное лакомство.
                </div>
              </li>
              <li className="mission-list__item active">
                <span className="mission-list__count">03</span>
                <div className="mission-list__content">
                  Наша цель – сочетать традиции и инновации, предлагая продукт,
                  который радует и вдохновляет.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Istoriya holding */}
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

      {/* <section className="history">
        <div className="timeline">
          <div className="faq-container">
            <h2 className="faq-title">История создания</h2>
            {data.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* Стратегия */}
      {/* <section className="st" data-aos="fade-up">
        <div className="box st-box">
          <div className="st-box__description">
            <h1>Стратегия, 2025</h1>
            <p>
              {`"Самым важным фактором наших достижений является правильно выстроенная стратегия. На сегодняшний день нашими специалистами разработан 5-летний план, который будет действовать до конца 2022 года.`}
            </p>
          </div>
          <div className="st-box__wrapper">
            <div className="st-box__wrapper__item">
              <i className="bx bx-lg bx-trending-up"></i>{" "}
              <p>
                Ежегодно запускаются два новых проекта по производству пищевых
                продуктов.
              </p>
            </div>
            <div className="st-box__wrapper__item">
              <i className="bx bx-lg bx-trending-up"></i>{" "}
              <p>
                Стремление стать крупнейшим и самым известным поставщиком
                пищевых продуктов среди стран СНГ.
              </p>
            </div>
            <div className="st-box__wrapper__item">
              <i className="bx bx-lg bx-trending-up"></i>{" "}
              <p>
                Постоянное повышение профессионального мастерства за счет опыта
                работы с зарубежными экспертами и институтами, развивающими
                взаимовыгодные отношения.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Партнеры Холдинга */}
      <section className="fourth">
        <div className="container fourth-container">
          <div className="fourth-container__title">
            <h1 data-aos="fade-right">Наши партнеры </h1>
            {/* <a href="/" data-aos="fade-left">
            Подробнее <Icons.rightArrow />
            </a> */}
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

      {/* Holding yangiliklari */}
    </div>
  );
};

export default About;
