import "./PageFallback.scss";

const PageFallback = () => (
  <div className="page-fallback" role="status" aria-live="polite">
    <div className="page-fallback__spinner" aria-hidden="true" />
    <span className="visually-hidden">Загрузка…</span>
  </div>
);

export default PageFallback;
