import ProductSection from "../../components/ProductSection/ProductSection";
import { catalogSections, catalogDownloads } from "../../constants/products";
import "./Catalog.scss";

const Catalog = ({ category }) => {
  const filteredSections = catalogSections.filter((section) => {
    if (category === "icecream") {
      return section.title === "Мороженое";
    }
    if (category === "syroki") {
      return section.title === "Творожные Сырки";
    }
    return true;
  });

  const filteredDownloads = catalogDownloads.filter((download) => {
    if (category === "icecream") {
      return download.file === "ahmedov_katalog.pdf";
    }
    if (category === "syroki") {
      return download.file === "newcatalog.pdf";
    }
    return true;
  });

  return (
    <section className="catalog">
      <div className="container catalog-container">
        <h1 data-aos="fade-left" className="catalog-container__title">
          Список продуктов{" "}
          {filteredDownloads.map(({ href, file, label }) => (
            <a key={file} href={href} download={file}>
              {label} <i className="bx bx-down-arrow-alt" />
            </a>
          ))}
        </h1>
        {filteredSections.map((section) => (
          <ProductSection
            key={section.title}
            title={section.title}
            groups={section.groups}
          />
        ))}
      </div>
    </section>
  );
};

export default Catalog;
