import { useState, useRef } from "react";
import "./History.scss";

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

const FAQ = () => {
  const data = [
    {
      question: "1992 год",
      answer:
        "История создания компании Akhmedov История компании Akhmedov - это история семьи, преданности делу и честного труда. Основателями бизнеса стали братья Батыр Akhmedov и Бахадыр Akhmedov. Именно они сделали первый шаг, с которого и начиналось все: от одной морозильной камеры - до крупнейшего производителя мороженого. Бизнес компании Akhmedov начал свое существование в 1992 году с простой, но перспективной идеи - перепродажи мороженого. На тот момент не было ни планов, ни намерений производить продукт самостоятельно. Все начиналось с покупки одной морозильной камеры, из которой и велась продажа мороженого на базаре в куйлюке - одном из оживленных рынков Ташкента.С течением времени бизнес начал постепенно расти. Количество морозильных ларей увеличивалось: сначала три, потом шесть, восемь и больше. Продажи шли активно, и спустя время на улице Ташкента поставили большой морозильный контейнер, рядом с которым был установлен вагончик. Из этого вагончика осуществлялась продажа мороженого как оптом, так и поштучно. Все шло полным ходом, спрос был высоким и дела шли отлично.",
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

  return (
    <div className="faq-container">
      <h2 className="faq-title">История компании</h2>
      {data.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;
