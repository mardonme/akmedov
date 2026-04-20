import { useState } from "react";
import FormField from "../../components/FormField/FormField";
import { submitContactForm } from "../../api/contact";
import { contactInfo } from "../../constants/contacts";
import "./Contact.scss";

const STATUS_RESET_MS = 2500;
const statusColors = {
  success: "green",
  error: "red",
  idle: "#f9532d",
  loading: "#f9532d",
};
const statusLabels = {
  idle: "Отправить",
  loading: "Отправка...",
  success: "Отправлено 😊",
  error: "Операции не отправлены... 🤷‍♂️",
};

const Contact = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    setStatus("loading");
    try {
      await submitContactForm(data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), STATUS_RESET_MS);
    }
  };

  const isSubmitting = status === "loading";

  return (
    <div className="contact">
      <div className="container">
        <div className="info-contact" data-aos="zoom-in">
          <h2 data-aos="fade-right">Контакты</h2>
          <b>Адрес:</b>
          <p>{contactInfo.address}</p>
          <a
            href={contactInfo.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram канал
          </a>
        </div>
      </div>
      <div className="contact-form-container">
        <div className="container">
          <h2 data-aos="fade-right">Связаться с нами</h2>
          <form onSubmit={handleSubmit} className="form-contact">
            <div className="contact-form">
              <FormField label="Ваше имя" name="name" placeholder="Укажите имя" />
              <FormField
                label="Номер телефона"
                name="phone"
                type="tel"
                placeholder="+998 90 999-99-99"
              />
              <FormField
                label="Электронная почта"
                name="email"
                type="email"
                placeholder="example@mail.com"
              />
              <FormField
                label="Тема сообщения"
                name="context"
                placeholder="Укажите тему"
              />
            </div>
            <FormField
              label="Сообщение"
              name="content"
              as="textarea"
              placeholder="Ваше сообщение"
            />
            <button
              disabled={isSubmitting}
              data-aos="zoom-in"
              type="submit"
              className="submit-button"
              style={{
                backgroundColor: statusColors[status],
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {statusLabels[status]}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
