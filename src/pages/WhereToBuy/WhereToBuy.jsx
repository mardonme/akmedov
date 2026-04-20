import {
  contactInfo,
  offlineStores,
  onlineStores,
} from "../../constants/contacts";
import "./WhereToBuy.scss";

const WhereToBuy = () => (
  <div className="where-to-buy">
    <div className="container">
      <h1 className="where-to-buy__title">
        Где приобрести мороженое от Akhmedov?
      </h1>

      <section className="where-to-buy__section">
        <h2>Online</h2>
        <p>Заказывайте продукцию Akhmedov не выходя из дома!</p>
        <ul>
          {onlineStores.map(({ name, href }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            </li>
          ))}
        </ul>
        <p className="order-number">
          Номер для заказа: {contactInfo.phones.order}
        </p>
      </section>

      <section className="where-to-buy__section">
        <h2>Offline</h2>
        <p>
          Теперь наше мороженое еще ближе! Теперь вы можете купить в магазинах
          рядом с вашим домом, а также в сетях:
        </p>
        <ul>
          {offlineStores.map((store) => (
            <li key={store}>{store}</li>
          ))}
        </ul>
        <div className="contacts">
          <p>Для потребителей: {contactInfo.phones.consumers.label}</p>
          <p>Для сотрудничества:</p>
          <p>Ташкент: {contactInfo.phones.tashkent.label}</p>
          <p>Регионы: {contactInfo.phones.regions.label}</p>
        </div>
      </section>

      <section className="where-to-buy__section">
        <h2>Социальные сети</h2>
        <ul>
          <li>
            <a
              href={contactInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={contactInfo.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram-канал
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
);

export default WhereToBuy;
