import { Link } from "react-router-dom";
import { catalogDownloads } from "../../constants/products";
import { contactInfo } from "../../constants/contacts";
import { deliveryAnnouncement } from "../../constants/delivery";
import "./Delivery.scss";

const Announcement = ({ text, aos }) => (
  <article className="delivery__card" data-aos={aos}>
    <span className="delivery__lang">{text.lang}</span>
    <h2>{text.title}</h2>
    <p className="delivery__intro">{text.intro}</p>

    <p className="delivery__row">
      <i className="bx bx-time-five" /> <strong>{text.hours}</strong>
    </p>

    <div className="delivery__row">
      <i className="bx bxs-truck" />
      <div>
        <strong>{text.deliveryTitle}</strong>
        <ul>
          {text.delivery.map(({ place, text: rule }) => (
            <li key={place}>
              <b>{place}</b> — {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <p className="delivery__row">
      <i className="bx bx-map" />
      <span>
        <strong>{text.zoneTitle}</strong> {text.zone}
      </span>
    </p>

    <p className="delivery__outro">{text.outro}</p>
  </article>
);

const Delivery = () => (
  <section className="delivery">
    <div className="container">
      <div className="delivery__cards">
        <Announcement text={deliveryAnnouncement.uz} aos="fade-right" />
        <Announcement text={deliveryAnnouncement.ru} aos="fade-left" />
      </div>

      <div className="delivery__actions" data-aos="fade-up">
        <a
          className="delivery__order"
          href={contactInfo.socials.admin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bxl-telegram" /> Buyurtma berish / Заказать
        </a>
        <a
          className="delivery__channel"
          href={contactInfo.socials.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bxl-telegram" /> Telegram kanal / Telegram-канал
        </a>
      </div>

      <div className="delivery__catalog-links" data-aos="fade-up">
        <i className="bx bx-book-open" />
        <span>Не знаете, что выбрать?</span>
        <Link to="/catalog/icecream">Мороженое</Link>
        <Link to="/catalog/syroki">Творожные сырки</Link>
        {catalogDownloads.map(({ href, file, label }) => (
          <a key={file} href={href} download={file}>
            {label} (PDF)
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Delivery;
