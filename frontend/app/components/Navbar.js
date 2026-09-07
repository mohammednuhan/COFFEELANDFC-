"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const dropdownItems = [
    { href: "/", label: "Home", desc: "Welcome to Coffeeland FC", icon: "🏠" },
    { href: "/about", label: "About Us", desc: "Our story & mission", icon: "📖" },
    { href: "/academy", label: "Academy", desc: "Training programs", icon: "⚽" },
    { href: "/events", label: "Events", desc: "Fixtures & tournaments", icon: "🏆" },
    { href: "/news", label: "News", desc: "Latest updates", icon: "📰" },
    { href: "/sponsors", label: "Sponsors", desc: "Community partners", icon: "🤝" },
    { href: "/contact", label: "Contact", desc: "Get in touch with us", icon: "✉️" },
  ];

  const isAnyActive = dropdownItems.some((item) => pathname === item.href);

  return (
    <header style={scrolled ? { background: "rgba(10, 18, 12, 0.97)", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" } : {}}>
      <nav>
        <Link href="/" className="logo-container" onClick={closeMenu}>
          <img src="/coffee-land-logo.jpeg" alt="Coffeeland FC Logo" className="nav-logo" />
          <div className="logo-text">
            COFFEELAND <span>FC</span>
          </div>
        </Link>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "open-menu" : ""}`}
          aria-label="Toggle Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {isMobileMenuOpen && (
          <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true"></div>
        )}

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="nav-item nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              className={`nav-dropdown-trigger ${isAnyActive ? "nav-active" : ""}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg className="menu-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect y="1" width="18" height="2" rx="1" fill="currentColor" />
                <rect y="8" width="18" height="2" rx="1" fill="currentColor" />
                <rect y="15" width="18" height="2" rx="1" fill="currentColor" />
              </svg>
              <svg
                className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`nav-dropdown ${isDropdownOpen ? "show" : ""}`}>
              <div className="nav-dropdown-inner">
                <div className="nav-dropdown-header">Navigate</div>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-dropdown-item ${pathname === item.href ? "nav-active" : ""}`}
                    onClick={closeMenu}
                  >
                    <span className="nav-dropdown-item-label">
                      <span className="nav-dropdown-item-icon" aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </span>
                    <span className="nav-dropdown-item-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          <li className="nav-item">
            <Link href="/contact" className="nav-join-btn" onClick={closeMenu}>
              Join Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
