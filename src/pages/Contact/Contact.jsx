import React, { useState } from "react";
import './Contact.scss'
import axios from "axios";
const Home = () => {
  const [send, setSend] = useState('');
  const [status, setStatus] = useState(''); // 'success', 'error', ''


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    setSend('Отправка...');
    try {
      const res = await axios.post(
        `https://olx-server-omega.vercel.app/api/message/submit`,
        data
      );
      setSend('Отправлено 😊');
      setStatus('success');
      e.target.reset();

      setTimeout(() => {
        setSend('');
        setStatus('');
      }, 2000);
    } catch (error) {
      setSend('Операции не отправлены... 🤷‍♂️');
      setStatus('error');

      setTimeout(() => {
        setSend('');
        setStatus('');
      }, 2000);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="info-contact" data-aos="zoom-in">
          <h2 data-aos="fade-right">Контакты</h2>
          <b>Адрес:</b>
          <p>OOO "SABE", г. Сырдарья, Сырдарьинская область, туманный центр Рахимов, улица Достлик, дом 20.</p>
          {/* <b>Телефон:</b> */}
          <a href="https://t.me/akhmedov_uzbekistan" target="_blank" rel="noopener noreferrer">Telegram канал</a>
          </div>
      </div>
     <div className="contact-form-container">
      <div className="container">
      <h2 data-aos="fade-right">Связаться с нами</h2>
      <form onSubmit={handleSubmit} className="form-contact">
        <div className="contact-form">
        <div className="form-group" data-aos="fade-up">
          <label>Ваше имя</label>
          <input
            type="text"
            name="name"
            placeholder="Укажите имя"
          />
        </div>
        <div className="form-group" data-aos="fade-up">
          <label>Номер телефона</label>
          <input
            type="tel"
            name="phone"
            placeholder="+998 90 999-99-99"
          />
        </div>
        <div className="form-group" data-aos="fade-up">
          <label>Электронная почта</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
          />
        </div>
        <div className="form-group" data-aos="fade-up">
          <label>Тема сообщения</label>
          <input
            type="text"
            name="context"
            placeholder="Укажите тему"
          />
        </div>
        </div>
        <div className="form-groups" data-aos="fade-up">
          <label>Сообщение</label>
          <textarea
            name="content"
            placeholder="Ваше сообщение"
          />
        </div>
        <button
                disabled={send}
                    data-aos="zoom-in" type="submit" className="submit-button"
                    style={{
                      backgroundColor:
                        status === "success" ? "green" : status === "error" ? "red" : "#f9532d",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {send || 'Отправить'}
                </button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Home;
