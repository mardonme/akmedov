import OptImage from "../OptImage/OptImage";
import "./Loader.scss";

// Purely visual splash; App.jsx owns the timing and passes `leaving` once the
// fade-out should start.
const Loader = ({ leaving }) => (
  <div className={`loader${leaving ? " loader--leaving" : ""}`} aria-hidden="true">
    <div className="content">
      <OptImage src="/images/logo.png" alt="Akhmedov" eager priority />
    </div>
  </div>
);

export default Loader;
