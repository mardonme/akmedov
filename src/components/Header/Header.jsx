import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useInfoContext } from "../../context/infoContext";
import { contactInfo } from "../../constants/contacts";
import "./Header.scss";

const primaryNav = [
  { to: "/about", label: "О компании" },
  { to: "/made", label: "Отдел производства" },
  { to: "/catalog", label: "Продукция" },
  { to: "/contact", label: "Контакты" },
  { to: "/buy", label: "Где купить?" },
];

const mobileNav = [
  { to: "/about", label: "О компании" },
  { to: "/catalog", label: "Продукция" },
  { to: "/contact", label: "Контакты" },
];

const bottomNav = [
  { to: "/", label: "Домой", icon: "bx-home-smile" },
  { to: "/about", label: "О компании", icon: "bx-package" },
  { to: "/catalog", label: "Продукция", icon: "bx-basket" },
  { to: "/contact", label: "Контакты", icon: "bx-universal-access" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scroll } = useInfoContext();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const headerPhone = contactInfo.phones.header;

  return (
    <header className="header" ref={scroll}>
      <div className="container">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="logo" />
        </Link>

        <nav className={`nav-links ${menuOpen ? "hidden" : ""}`}>
          {primaryNav.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={`contact ${menuOpen ? "hidden" : ""}`}>
          <Link to={headerPhone.href} className="phone">
            {headerPhone.label}
          </Link>
        </div>

        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {mobileNav.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={closeMenu}>
            {item.label}
          </NavLink>
        ))}
        <Link to={headerPhone.href} className="phone">
          {headerPhone.label}
        </Link>
      </div>

      <div className="media-mobile">
        {bottomNav.map((item) => (
          <NavLink key={item.to} to={item.to}>
            <i className={`bx ${item.icon}`} /> {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
