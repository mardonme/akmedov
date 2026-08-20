import OptImage from "../OptImage/OptImage";
import "./CatalogHero.scss";

// Glaze running off the bottom edge of the block — narrow, uneven, alive.
const DRIPS = [
  { left: "8%", width: 26, height: 34, delay: "0s" },
  { left: "16%", width: 16, height: 18, delay: "1.4s" },
  { left: "27%", width: 34, height: 52, delay: "0.7s" },
  { left: "38%", width: 18, height: 22, delay: "2s" },
  { left: "52%", width: 28, height: 40, delay: "0.4s" },
  { left: "63%", width: 15, height: 16, delay: "1.7s" },
  { left: "74%", width: 32, height: 46, delay: "1s" },
  { left: "86%", width: 20, height: 26, delay: "0.2s" },
];

/**
 * Above-the-fold intro for the catalog pages: the first thing a visitor sees
 * after opening "Продукция". Copy + packs come from `catalogHeroes`
 * (src/constants/products.js) — edit the content there, not here.
 *
 * `hero.images` renders as a bottom-aligned lineup so the packs read as one
 * product family; each entry's `width` is its share of the visual column.
 *
 * `download` is the matching PDF from `catalogDownloads` (optional).
 * `onExplore` scrolls the page down to the product list.
 */
const CatalogHero = ({ hero, download, onExplore }) => {
  if (!hero) return null;

  return (
    <section className="catalog-hero">
      <div className="catalog-hero__panel">
        <span className="catalog-hero__blob catalog-hero__blob--berry" aria-hidden="true" />
        <span className="catalog-hero__blob catalog-hero__blob--mint" aria-hidden="true" />
        <span className="catalog-hero__shine" aria-hidden="true" />

        <div className="catalog-hero__content">
          <div className="catalog-hero__copy" data-aos="fade-right">
            {/* <span className="catalog-hero__eyebrow">
              <i className="bx bxs-circle" /> {hero.eyebrow}
            </span> */}

            <h1 className="catalog-hero__title">
              {hero.title} <span>{hero.accent}</span>
            </h1>

            {/* <p className="catalog-hero__text">{hero.text}</p> */}

            {/* <ul className="catalog-hero__flavors">
              {hero.flavors.map(({ emoji, label }) => (
                <li key={label}>
                  <span aria-hidden="true">{emoji}</span> {label}
                </li>
              ))}
            </ul> */}

            <div className="catalog-hero__actions">
              <button type="button" className="catalog-hero__btn" onClick={onExplore}>
                {hero.cta} <i className="bx bx-down-arrow-alt" />
              </button>
              {download && (
                <a
                  className="catalog-hero__btn catalog-hero__btn--ghost"
                  href={download.href}
                  download={download.file}
                >
                  <i className="bx bx-download" /> {download.label}
                </a>
              )}
            </div>

            <dl className="catalog-hero__stats">
              {hero.stats.map(({ value, label }) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="catalog-hero__visual" data-aos="zoom-in">
            <span className="catalog-hero__visual__glow" aria-hidden="true" />

            <ul className="catalog-hero__lineup">
              {hero.images.map((image, idx) => (
                <li
                  key={image.src}
                  style={{ "--w": image.width, "--z": String(idx + 1) }}
                >
                  <OptImage src={image.src} alt={image.alt} eager priority={idx === 0} />
                </li>
              ))}
            </ul>

            {/* <span className="catalog-hero__sticker">{hero.sticker}</span> */}
          </div>
        </div>
      </div>

      <div className="catalog-hero__drips" aria-hidden="true">
        {DRIPS.map((drip) => (
          <span
            key={drip.left}
            style={{
              left: drip.left,
              width: drip.width,
              height: drip.height,
              animationDelay: drip.delay,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CatalogHero;
