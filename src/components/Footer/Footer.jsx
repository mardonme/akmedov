import { useInfoContext } from "../../context/infoContext";
import "./Footer.scss";
import { RiInstagramFill, RiTelegramFill } from 'react-icons/ri';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const { update, setUpdate } = useInfoContext();
  return (
    <footer>
      <div className="footer__container">
        <div className="footer__left">
          <div className="footer-menu__wrap">
            <div className="footer-menu">
              <a href="/about" className="footer-menu__name">
                О компании
              </a>
              <ul className="footer-menu__list">
                <li className="footer-menu__item">Наша миссия</li>
                <li className="footer-menu__item">История компании</li>
                {/* <li className="footer-menu__item">Наши проекты</li> */}
              </ul>
              <a href="/contact" className="footer-menu__name">
                Контакты
              </a>
            </div>
            <div className="footer-menu">
              <a href="/catalog" className="footer-menu__name">
                Список продуктов
              </a>
              <ul className="footer-menu__list">
                <li className="footer-menu__item">Наша миссия</li>
                <li className="footer-menu__item">История компании</li>
                <li className="footer-menu__item">Наши проекты</li>
              </ul>
              <a href="/about" className="footer-menu__name">
                Партнерство
              </a>
              <ul className="footer-menu__list">
                {/* <li className="footer-menu__item">Партнеры компании</li> */}
                {/* <li className="footer-menu__item">Тендеры</li> */}
                {/* <li className="footer-menu__item">Условия продаж</li> */}
              </ul>
            </div>
            <div className="footer-menu"></div>
          </div>
          <p className="footer-copyright">
            Использование материалов сайта разрешается только при указании
            источника. © 2002 - 2025 Холдинг «AKHMEDOV»
          </p>
        </div>
        {/* <div className="footer__right">
          <section className="footer-feedback">
            <h2 className="title">Свяжитесь с нами</h2>
            <p>
              Заполните форму, и наш менеджер свяжется с вами.
            </p>
            <div className="footer-feedback__row">
              <a href="contact">
                Связаться с нами
                <i className="bx bx-right-arrow-alt"></i>
              </a>
            </div>
          </section>
          <div className="footer-row">
          <div className="footer-contact">
              <h2 className="footer-contact__title">Контактная информация</h2>
              <p><strong>Для потребителей:</strong>+998990558283</p>
              <p><strong>Для сотрудничества:</strong></p>
              <p>Ташкент: +998 98 888 08 38</p>
              <p>Регионы: +998 90 043 04 83</p>
            </div>
            <div className="social">
              <strong className="social__name">Мы в социальных сетях:</strong>
              <ul className="social__list">
                <li className="social__item">
                  <a
                    className="social-link"
                    href="https://www.instagram.com/akhmedovuzbekistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Наша страница в Instagram"
                  >
                    <RiInstagramFill />
                  </a>
                </li>
                <li className="social__item">
                  <a
                    className="social-link"
                    href="https://www.t.me/Farengiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Наша страница в Telegram"
                  >
                    <RiTelegramFill />
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-scrolling" onClick={() => setUpdate(!update)}>
              <i className="bx bx-lg bx-up-arrow-alt bx-fade-up"></i>
            </div>
          </div>
        </div> */}

<div className="footer__right">
      <section className="footer-feedback">
        <h2 className="footer__title">Свяжитесь с нами</h2>
        <p className="footer__text">
          Заполните форму, и наш менеджер свяжется с вами.
        </p>
        <div className="footer-feedback__row">
          <a href="contact" className="contact-link">
            Связаться с нами
            <i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </section>

      <div className="footer-row">
        <div className="footer-contact">
          <h2 className="footer__title">Контактная информация</h2>
          
          <div className="contact-group">
            <p className="contact-label">Для потребителей:</p>
            <a href="tel:+998990558283" className="contact-number">+998 98 888-08-38</a>
          </div>
          
          <p className="contact-label">Для сотрудничества:</p>
          
          <div className="contact-group">
            <p className="contact-city">Ташкент:</p>
            <a href="tel:+998988880838" className="contact-number">+998 98 888-08-38</a>
          </div>
          
          <div className="contact-group">
            <p className="contact-city">Регионы:</p>
            <a href="tel:+998900430483" className="contact-number">+998 90 043-04-83</a>
          </div>
        </div>

        <div className="footer-social">
          <strong className="social__title">Мы в социальных сетях:</strong>
          <ul className="social-list">
            <li className="social-item">
              <a
                href="https://www.instagram.com/akhmedovuzbekistan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-link"
              >
                <RiInstagramFill />
              </a>
            </li>
            <li className="social-item">
              <a
                href="https://www.t.me/Farengiz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="social-link"
              >
                <RiTelegramFill />
              </a>
            </li>
          </ul>
        </div>

        <button 
          className="scroll-top" 
          onClick={() => setUpdate(prev => !prev)}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
      </div>
    </footer>
  );
};

export default Footer;
