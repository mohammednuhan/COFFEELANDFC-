import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand-section">
                        <div className="footer-brand">
                            COFFEELAND <span>FC</span>
                        </div>
                        <p>Developing football talent in Chikmagalur since 2010. KSFA affiliated club committed to grassroots excellence.</p>
                    </div>

                    <div className="footer-links-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/academy">Academy</Link></li>
                            <li><Link href="/events">Events</Link></li>
                            <li><Link href="/sponsors">Sponsors</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact-section">
                        <h4>Contact</h4>
                        <p>📍 Vijaya Nagar, Chikkamagaluru – 577101</p>
                        <p>📞 Contact us for details</p>
                        <p>🕒 Training: 6 AM – 8 PM</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Coffeeland FC Academy, Chikmagalur. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
