import OptImage from "../OptImage/OptImage";
import "./Loader.scss";

const Loader = ({ onDismiss }) => (
  <div
    className="loader"
    onClick={onDismiss}
    role="button"
    tabIndex={0}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") onDismiss();
    }}
    aria-label="Войти на сайт"
  >
    <div className="content">
      <OptImage src="/images/logo.png" alt="Akhmedov" eager priority />
    </div>
  </div>
);

export default Loader;
