import { Link } from "react-router-dom";
import "./Catalog.scss";

const Catalog = () => {
  return (
    <>
      <section className="catalog">
        <div className="container catalog-container">
          <h1 data-aos="fade-left" className="catalog-container__title">
            {`Список продуктов`}{" "}
            <a
              href="/images/ahmedov_katalog.pdf"
              download="ahmedov_katalog.pdf"
            >
              Загрузка каталога <i className="bx bx-down-arrow-alt"></i>
            </a>
          </h1>
          <div data-aos="fade-up" className="catalog-container__wrapper">
            <h1 className="catalog-container__wrapper__title">Мороженое</h1>
            <div
              data-aos="fade-up"
              className="catalog-container__wrapper__box maxs"
            >
              <h2 className="catalog-container__wrapper__box__subtitle">
                Kreasy max
              </h2>
              <div
                data-aos="fade-up"
                className="catalog-container__wrapper__box__row"
              >
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Kreasy.png" alt="iceCream" />
                  <p>Кризи Макс Ягода</p>
                </Link>
                {/* <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Kreasy1.png" alt="iceCream" />
                  <p>Кризи Макс Ягода</p>
                </Link> */}
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Kreasy2.png" alt="iceCream" />
                  <p>Кризи Макс Ягода</p>
                </Link>
                {/* <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Kreasy3.png" alt="iceCream" />
                  <p>Кризи Макс Ягода</p>
                </Link> */}
              </div>
            </div>
            <div data-aos="fade-up" className="catalog-container__wrapper__box">
              <h2 className="catalog-container__wrapper__box__subtitle">
                Рожок
              </h2>
              <div className="catalog-container__wrapper__box__row">
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/1.png" alt="iceCream" />
                  <p>Рожок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/2.png" alt="iceCream" />
                  <p>Рожок Вишня</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/3.png" alt="iceCream" />
                  <p>Рожок Карамель</p>
                </Link>
                {/* <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/4.png" alt="iceCream" />
                  <p>Рожок Вишня</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/5.png" alt="iceCream" />
                  <p>Рожок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/pic5.png" alt="iceCream" />
                  <p>Рожок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/pic6.png" alt="iceCream" />
                  <p>Рожок Вишня</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/pic7.png" alt="iceCream" />
                  <p>Рожок Вишня</p>
                </Link> */}
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="catalog-container__wrapper">
            <h2 className="catalog-container__wrapper__title">Сырки</h2>
            <div data-aos="fade-up" className="catalog-container__wrapper__box">
              <h3 className="catalog-container__wrapper__box__subtitle">
                Сырок Батончик
              </h3>
              <div className="catalog-container__wrapper__box__row maxs">
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Сыробушки.png" alt="iceCream" />
                  <p>Сырок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Сыробушки1.png" alt="iceCream" />
                  <p>Сырок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Сыробушки2.png" alt="iceCream" />
                  <p>Сырок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Сыробушки3.png" alt="iceCream" />
                  <p>Сырок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Сыробушки4.png" alt="iceCream" />
                  <p>Сырок Карамель</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/Сыробушки5.png" alt="iceCream" />
                  <p>Сырок Карамель</p>
                </Link>
              </div>
            </div>
            <div data-aos="fade-up" className="catalog-container__wrapper__box">
              <h2 className="catalog-container__wrapper__box__subtitle">
                Сырок Макси
              </h2>
              <div
                data-aos="fade-up"
                className="catalog-container__wrapper__box__row"
              >
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/SirokM.png" alt="iceCream" />
                  <p>Сырок Пломбир</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/SirokM1.png" alt="iceCream" />
                  <p>Сырок Пломбир</p>
                </Link>
                <Link className="catalog-container__wrapper__box__row__item">
                  <img src="images/SirokM2.png" alt="iceCream" />
                  <p>Сырок Пломбир</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Catalog;
