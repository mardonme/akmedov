import ProductCard from "../ProductCard/ProductCard";

const ProductSection = ({ title, groups }) => (
  <div data-aos="fade-up" className="catalog-container__wrapper">
    <h1 className="catalog-container__wrapper__title">{title}</h1>
    {groups.map(({ subtitle, items, rowClass = "" }) => (
      <div
        key={subtitle}
        data-aos="fade-up"
        className={`catalog-container__wrapper__box ${rowClass}`.trim()}
      >
        <h2 className="catalog-container__wrapper__box__subtitle">
          {subtitle}
        </h2>
        <div
          className={`catalog-container__wrapper__box__row ${rowClass}`.trim()}
        >
          {items.map((item) => (
            <ProductCard key={item.name + item.img} {...item} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ProductSection;
