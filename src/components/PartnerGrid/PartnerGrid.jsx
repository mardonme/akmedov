import { partners } from "../../constants/partners";
import "./PartnerGrid.scss";

const PartnerGrid = ({ title = "Наши партнеры" }) => (
  <section className="fourth">
    <div className="container fourth-container">
      <div className="fourth-container__title">
        <h2 data-aos="fade-right">{title}</h2>
      </div>
      <div data-aos="fade-up" className="fourth-container__wrapper">
        {partners.map((partner) => (
          <div key={partner.img} className="fourth-container__wrapper__item">
            <img src={partner.img} alt={partner.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerGrid;
