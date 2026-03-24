"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SponsorsPage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("visible");
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1>
                        Our <span className="accent">Sponsors</span>
                    </h1>
                    <p>Partnering with local businesses to fuel Chikmagalur's football dreams</p>
                </div>
            </div>

            {/* Why Sponsor CFC */}
            <section className="animate-on-scroll">
                <div className="container">
                    <div className="content-grid" style={{ alignItems: "center" }}>
                        <div>
                            <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
                                Why Sponsor <span className="accent">CFC?</span>
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                                By sponsoring Coffeeland FC, you are directly investing in the youth of Chikmagalur. You provide them with
                                better equipment, facility access, exposure trips, and professional coaching.
                            </p>
                            <ul className="content-list">
                                <li><strong>Grassroots Impact:</strong> Keep football accessible for all children.</li>
                                <li><strong>Community Visibility:</strong> Reach over 400+ families and thousands of local spectators.</li>
                                <li><strong>Jersey Branding:</strong> Your logo on our matchdays and training kits.</li>
                                <li><strong>Tournament Branding:</strong> High visibility during the district tournaments we host.</li>
                            </ul>
                        </div>
                        <div className="card gold-border" style={{ padding: "3rem", background: "var(--surface-accent)", textAlign: "center" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--white)" }}>Join Our Legacy</h3>
                            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                                Looking to support the community and boost your local brand presence? Let's team up.
                            </p>
                            <Link href="/contact" className="btn-primary full-width">
                                Inquire About Sponsorship
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsorship Packages */}
            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Sponsorship <span className="accent">Packages</span>
                    </h2>
                    <p className="section-subtitle">
                        Choose a tier that aligns with your brand's community goals.
                    </p>

                    <div className="packages-grid">
                        <div className="package-card">
                            <h3>Jersey Sponsor</h3>
                            <div className="package-price">₹5,000<small>/yr</small></div>
                            <ul style={{ listStyle: "none", color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Small logo on training kits</li>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Website acknowledgment</li>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Social media mention</li>
                            </ul>
                        </div>

                        <div className="package-card featured" style={{ position: "relative" }}>
                            <span className="badge">Best Value</span>
                            <h3>Event Sponsor</h3>
                            <div className="package-price">₹6,000<small>/event</small></div>
                            <ul style={{ listStyle: "none", color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Prominent banners at the tournament</li>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Logo on marketing materials</li>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Exclusive pre-match announcements</li>
                            </ul>
                        </div>

                        <div className="package-card" style={{ borderColor: "var(--accent)" }}>
                            <h3 style={{ color: "var(--accent)" }}>Title Sponsor</h3>
                            <div className="package-price">Custom</div>
                            <ul style={{ listStyle: "none", color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Front center of match jersey</li>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Premium web placement</li>
                                <li style={{ marginBottom: "0.5rem" }}>✓ Maximum brand exposure</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Sponsors Grid */}
            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Our Current <span className="accent">Partners</span>
                    </h2>
                    <p className="section-subtitle">
                        The amazing businesses that help us keep the dream alive.
                    </p>

                    <div className="sponsors-grid">
                        <div className="sponsor-placeholder" style={{ width: "200px", height: "100px", fontSize: "1rem" }}>Partner 1</div>
                        <div className="sponsor-placeholder" style={{ width: "200px", height: "100px", fontSize: "1rem" }}>Partner 2</div>
                        <div className="sponsor-placeholder" style={{ width: "200px", height: "100px", fontSize: "1rem" }}>Partner 3</div>
                        <div className="sponsor-placeholder" style={{ width: "200px", height: "100px", fontSize: "1rem" }}>Partner 4</div>
                        <div className="sponsor-placeholder" style={{ width: "200px", height: "100px", fontSize: "1rem" }}>Partner 5</div>
                        <div className="sponsor-placeholder" style={{ width: "200px", height: "100px", fontSize: "1rem" }}>Partner 6</div>
                    </div>
                </div>
            </section>
        </>
    );
}
