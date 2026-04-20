import ProductSection from "../../components/ProductSection/ProductSection";
import { catalogSections, catalogDownloads } from "../../constants/products";
import "./Catalog.scss";

const Catalog = () => (
  <section className="catalog">
    <div className="container catalog-container">
      <h1 data-aos="fade-left" className="catalog-container__title">
        Список продуктов{" "}
        {catalogDownloads.map(({ href, file, label }) => (
          <a key={file} href={href} download={file}>
            {label} <i className="bx bx-down-arrow-alt" />
          </a>
        ))}
      </h1>
      {catalogSections.map((section) => (
        <ProductSection
          key={section.title}
          title={section.title}
          groups={section.groups}
        />
      ))}
    </div>
  </section>
);

export default Catalog;
