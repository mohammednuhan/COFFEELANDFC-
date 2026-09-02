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

  const dropdownItems = [
    { href: "/", label: "Home", desc: "Welcome to Coffeeland FC" },
    { href: "/about", label: "About Us", desc: "Our story & mission" },
    { href: "/academy", label: "Academy", desc: "Training programs" },
    { href: "/events", label: "Events", desc: "Fixtures & tournaments" },
    { href: "/news", label: "News", desc: "Latest updates" },
    { href: "/sponsors", label: "Sponsors", desc: "Community partners" },
    { href: "/contact", label: "Contact", desc: "Get in touch with us" },
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

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="nav-item nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              className={`nav-dropdown-trigger ${isAnyActive ? "nav-active" : ""}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Menu
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
                {dropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-dropdown-item ${pathname === item.href ? "nav-active" : ""}`}
                    onClick={closeMenu}
                  >
                    <span className="nav-dropdown-item-label">{item.label}</span>
                    <span className="nav-dropdown-item-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          <li className="nav-item">
            <Link href="/contact" className="btn-primary" onClick={closeMenu}>
              Join Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
