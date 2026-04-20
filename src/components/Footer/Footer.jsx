import { FaArrowUp } from "react-icons/fa";
import { RiInstagramFill, RiTelegramFill } from "react-icons/ri";
import { useInfoContext } from "../../context/infoContext";
import { contactInfo } from "../../constants/contacts";
import "./Footer.scss";

const footerMenus = [
  {
    heading: { label: "О компании", href: "/about" },
    links: ["Наша миссия", "История компании"],
    trailing: { label: "Контакты", href: "/contact" },
  },
  {
    heading: { label: "Список продуктов", href: "/catalog" },
    links: ["Наша миссия", "История компании", "Наши проекты"],
    trailing: { label: "Партнерство", href: "/about" },
  },
];

const socials = [
  {
    href: contactInfo.socials.instagram,
    label: "Instagram",
    Icon: RiInstagramFill,
  },
  {
    href: "https://www.t.me/Farengiz",
    label: "Telegram",
    Icon: RiTelegramFill,
  },
];

const Footer = () => {
  const { setUpdate } = useInfoContext();

  const scrollToTop = () => setUpdate((prev) => !prev);

  return (
    <footer>
      <div className="footer__container">
        <div className="footer__left">
          <div className="footer-menu__wrap">
            {footerMenus.map((menu) => (
              <div key={menu.heading.label} className="footer-menu">
                <a href={menu.heading.href} className="footer-menu__name">
                  {menu.heading.label}
                </a>
                <ul className="footer-menu__list">
                  {menu.links.map((link) => (
                    <li key={link} className="footer-menu__item">
                      {link}
                    </li>
                  ))}
                </ul>
                {menu.trailing && (
                  <a href={menu.trailing.href} className="footer-menu__name">
                    {menu.trailing.label}
                  </a>
                )}
              </div>
            ))}
            <div className="footer-menu" />
          </div>
          <p className="footer-copyright">
            Использование материалов сайта разрешается только при указании
            источника. © 2002 - {new Date().getFullYear()} Холдинг «AKHMEDOV»
          </p>
        </div>

        <div className="footer__right">
          <section className="footer-feedback">
            <h2 className="footer__title">Свяжитесь с нами</h2>
            <p className="footer__text">
              Заполните форму, и наш менеджер свяжется с вами.
            </p>
            <div className="footer-feedback__row">
              <a href="/contact" className="contact-link">
                Связаться с нами
                <i className="bx bx-right-arrow-alt" />
              </a>
            </div>
          </section>

          <div className="footer-row">
            <div className="footer-contact">
              <h2 className="footer__title">Контактная информация</h2>

              <div className="contact-group">
                <p className="contact-label">Для потребителей:</p>
                <a
                  href={contactInfo.phones.consumers.href}
                  className="contact-number"
                >
                  {contactInfo.phones.consumers.label}
                </a>
              </div>

              <p className="contact-label">Для сотрудничества:</p>

              <div className="contact-group">
                <p className="contact-city">Ташкент:</p>
                <a
                  href={contactInfo.phones.tashkent.href}
                  className="contact-number"
                >
                  {contactInfo.phones.tashkent.label}
                </a>
              </div>

              <div className="contact-group">
                <p className="contact-city">Регионы:</p>
                <a
                  href={contactInfo.phones.regions.href}
                  className="contact-number"
                >
                  {contactInfo.phones.regions.label}
                </a>
              </div>
            </div>

            <div className="footer-social">
              <strong className="social__title">Мы в социальных сетях:</strong>
              <ul className="social-list">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label} className="social-item">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="social-link"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="scroll-top"
              onClick={scrollToTop}
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
