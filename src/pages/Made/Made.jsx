import React from "react";
import "./Made.scss";

const Production = () => {
  return (
    <div className="production">
      <div className="container">
        <h1 className="production__title">Отдел производства</h1>

        <section className="production__section">
          <h2>Как мы делаем наше мороженое?</h2>
          <p>
            Качество начинается с заботы. Именно поэтому мы используем только
            натуральные ингредиенты: отборное молоко и натуральные наполнители.
            Никаких компромиссов — только проверенные поставщики и рецепты,
            которым можно доверять.
          </p>
          <p>
            Наше производство соответствует строгим стандартам безопасности и
            качества. Каждый этап — от приемки сырья до упаковки — проходит
            контроль, чтобы вы были уверены: это мороженое безопасно и
            действительно вкусное.
          </p>
          <p>
            Мы гордимся тем, что сочетаем современные технологии с теплом
            семейных традиций. Ведь хорошее мороженое — это не только вкусно,
            но и по-настоящему надёжно. Мы верим, что хорошее мороженое
            начинается с любви — к делу, к людям и к традициям. Поэтому каждый
            вкус — как домашний, с любовью.
          </p>
        </section>

        <section className="production__section">
          <h2>Сердце нашего производства — Сырдарья</h2>
          <p>
            Наше производство находится в сердце Сырдарьинской области — и мы
            по-настоящему гордимся этим. Именно здесь, в этом уютном городе,
            рождается мороженое, которое каждый день радует детей и взрослых по
            всему Узбекистану.
          </p>
          <p>
            Сырдарья — не просто точка на карте. Это место, где работает наш
            завод, где создаются любимые вкусы, где трудятся более тысячи
            человек. Мы не просто предоставляем рабочие места — мы даём
            уверенность, дом, возможность расти и развиваться каждому
            сотруднику в этом регионе.
          </p>
        </section>

        <section className="production__section">
          <h2>Наша команда — наша гордость</h2>
          <p>
            Наша команда — это одна большая семья. Здесь царит поддержка,
            уважение, любовь к делу и забота друг о друге. Именно эта
            сплочённость, искренность и душа, вложенная в каждую упаковку, и
            делают нашу продукцию особенной.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Production;
