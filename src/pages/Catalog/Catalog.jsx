import { useRef } from "react";
import { Link } from "react-router-dom";
import ProductSection from "../../components/ProductSection/ProductSection";
import CatalogHero from "../../components/CatalogHero/CatalogHero";
import {
  catalogSections,
  catalogDownloads,
  catalogHeroes,
} from "../../constants/products";
import "./Catalog.scss";

const Catalog = ({ category }) => {
  const listRef = useRef(null);

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

  const hero = catalogHeroes[category] || catalogHeroes.icecream;

  const scrollToList = () =>
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="catalog">
      <div className="container catalog-container">
        <CatalogHero
          hero={hero}
          download={filteredDownloads[0]}
          onExplore={scrollToList}
        />

        <h1
          ref={listRef}
          data-aos="fade-left"
          className="catalog-container__title"
        >
          Наша продукция{" "}
          {filteredDownloads.map(({ href, file, label }) => (
            <a key={file} href={href} download={file}>
              {label} <i className="bx bx-down-arrow-alt" />
            </a>
          ))}
        </h1>
        <Link to="/dostavka" className="catalog-container__delivery">
          <i className="bx bx-cycling" />
          Заказать с доставкой на дом
        </Link>

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
