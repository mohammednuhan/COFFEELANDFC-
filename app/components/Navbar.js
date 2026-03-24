"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const closeMenu = () => setIsMobileMenuOpen(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/academy", label: "Academy" },
        { href: "/events", label: "Events" },
        { href: "/sponsors", label: "Sponsors" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header>
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
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={pathname === link.href ? "nav-active" : ""}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/contact" className="btn-primary" onClick={closeMenu}>
                            Join Now
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
