import { Link } from "react-router-dom";

const ProductCard = ({ img, name, to = "#" }) => (
  <Link to={to} className="catalog-container__wrapper__box__row__item">
    <img src={img} alt={name} loading="lazy" />
    <p>{name}</p>
  </Link>
);

export default ProductCard;
