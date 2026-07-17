import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useInfoContext } from "../../context/infoContext";
import { contactInfo } from "../../constants/contacts";
import OptImage from "../OptImage/OptImage";
import "./Header.scss";

const primaryNav = [
  { to: "/about", label: "О компании" },
  { to: "/made", label: "Отдел производства" },
  {
    to: "/catalog",
    label: "Продукция",
    dropdown: [
      { to: "/catalog/icecream", label: "Мороженое" },
      { to: "/catalog/syroki", label: "Творожные сырки" },
    ],
  },
  { to: "/contact", label: "Контакты" },
  { to: "/buy", label: "Где купить?" },
];

const mobileNav = [
  { to: "/about", label: "О компании" },
  { to: "/catalog/icecream", label: "Мороженое" },
  { to: "/catalog/syroki", label: "Творожные сырки" },
  { to: "/contact", label: "Контакты" },
  { to: "/buy", label: "Где купить?" },
];

const bottomNav = [
  { to: "/", label: "Домой", icon: "bx-home-smile" },
  { to: "/about", label: "О компании", icon: "bx-package" },
  { to: "/catalog/icecream", label: "Мороженое", icon: "bx-basket" },
  { to: "/catalog/syroki", label: "Сырки", icon: "bx-heart" },
  { to: "/contact", label: "Контакты", icon: "bx-universal-access" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { scroll } = useInfoContext();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const headerPhone = contactInfo.phones.header;

  return (
    <header className="header" ref={scroll}>
      <div className="container">
        <Link to="/" className="logo">
          <OptImage src="/images/logo.png" alt="logo" eager />
        </Link>

        <nav className={`nav-links ${menuOpen ? "hidden" : ""}`}>
          {primaryNav.map((item) => {
            if (item.dropdown) {
              const isCatalogActive = location.pathname.startsWith("/catalog");
              return (
                <div 
                  key={item.to} 
                  className={`nav-dropdown ${dropdownOpen ? "open" : ""}`}
                  ref={dropdownRef}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={`nav-dropdown-trigger ${isCatalogActive ? "active" : ""}`}
                  >
                    {item.label} <i className="bx bx-chevron-down" style={{ marginLeft: "2px", verticalAlign: "middle" }} />
                  </button>
                  <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                    {item.dropdown.map((subItem) => (
                      <NavLink 
                        key={subItem.to} 
                        to={subItem.to} 
                        onClick={() => {
                          setDropdownOpen(false);
                          closeMenu();
                        }}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            );
          })}
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
