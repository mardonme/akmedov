import { Link } from "react-router-dom";
import OptImage from "../OptImage/OptImage";

const ProductCard = ({ img, name, to = "#" }) => (
  <Link to={to} className="catalog-container__wrapper__box__row__item">
    <OptImage src={img} alt={name} />
    <p>{name}</p>
  </Link>
);

export default ProductCard;
