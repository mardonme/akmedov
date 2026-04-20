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
      <img src="/images/logo.png" alt="Akhmedov" />
    </div>
  </div>
);

export default Loader;
