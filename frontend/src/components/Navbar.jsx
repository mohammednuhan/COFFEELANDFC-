import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setIsMobileMenuOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/academy", label: "Academy" },
    { href: "/events", label: "Events" },
    { href: "/news", label: "News" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header style={scrolled ? { background: "rgba(10, 18, 12, 0.97)", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" } : {}}>
      <nav>
        <Link to="/" className="logo-container" onClick={closeMenu}>
          <img src="/coffee-land-logo.jpeg" alt="Coffeeland FC Logo" className="nav-logo" />
          <div className="logo-text">COFFEELAND <span>FC</span></div>
        </Link>
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "open-menu" : ""}`}
          aria-label="Toggle Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
        {isMobileMenuOpen && (
          <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true"></div>
        )}
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {navLinks.map((item) => (
            <li key={item.href} className="nav-item">
              <Link
                to={item.href}
                className={pathname === item.href ? "nav-active" : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <Link to="/contact" className="nav-join-btn" onClick={closeMenu}>Join Now</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}