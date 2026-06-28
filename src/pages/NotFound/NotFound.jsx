import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => (
  <div className="not-found">
    <div className="container">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Страница не найдена</h1>
      <p className="not-found__text">
        К сожалению, такой страницы не существует или она была перемещена.
        Возможно, вы перешли по устаревшей ссылке.
      </p>
      <Link to="/" className="not-found__btn">
        Вернуться на главную
      </Link>
    </div>
  </div>
);

export default NotFound;
