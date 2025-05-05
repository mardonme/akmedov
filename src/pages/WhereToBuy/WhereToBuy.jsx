import React from "react";
import "./WhereToBuy.scss";

const WhereToBuy = () => {
  return (
    <div className="where-to-buy">
      <div className="container">
        <h1 className="where-to-buy__title">Где приобрести мороженое от Akhmedov?</h1>

        <section className="where-to-buy__section">
          <h2>Online</h2>
          <p>
            Заказывайте продукцию Akhmedov не выходя из дома!
          </p>
          <ul>
            <li>
              <a href="https://apps.apple.com/us/app/yandex-go-taxi-food-delivery/id472650686" target="_blank" rel="noopener noreferrer">Yandex.go</a>
            </li>
            <li>
              <a href="https://korzinka.uz/" target="_blank" rel="noopener noreferrer">Korzinka.uz</a> 
            </li>
            <li>
              <a href="https://t.me/akhmedov_uzbekistan" target="_blank" rel="noopener noreferrer">Телеграм канал</a>
            </li>
          </ul>
          <p className="order-number">Номер для заказа: +998900514841</p>
        </section>

        <section className="where-to-buy__section">
          <h2>Offline</h2>
          <p>
            Теперь наше мороженое еще ближе! Теперь вы можете купить в магазинах рядом с вашим домом, а также в сетях:
          </p>
          <ul>
            <li>Korzinka</li>
            <li>Makro</li>
            <li>Magnum</li>
            <li>Havas</li>
            <li>Galmart</li>
          </ul>
          <div className="contacts">
            <p>Для потребителей: +998 98 888 08 38</p>
            <p>Для сотрудничества:</p>
            <p>Ташкент: +998 98 888 08 38</p>
            <p>Регионы: +998 90 043 04 83</p>
          </div>
        </section>

        <section className="where-to-buy__section">
          <h2>Социальные сети</h2>
          <ul>
            <li>
              <a href="https://www.instagram.com/akhmedovuzbekistan" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a href="https://t.me/akhmedov_uzbekistan" target="_blank" rel="noopener noreferrer">Telegram канал</a>
            </li>
            <li>
              <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer">Gmail</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default WhereToBuy;
