import { partners } from "../../constants/partners";

const PartnerGrid = ({ title = "Наши партнеры" }) => (
  <section className="fourth">
    <div className="container fourth-container">
      <div className="fourth-container__title">
        <h1 data-aos="fade-right">{title}</h1>
      </div>
      <div data-aos="fade-up" className="fourth-container__wrapper">
        {partners.map((partner, idx) => (
          <a key={idx}>
            <img src={partner.img} alt={partner.alt} loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerGrid;
