"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
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
            <div className="page-header">
                <div className="container">
                    <h1 className="fade-in-up">
                        About <span className="accent">Us</span>
                    </h1>
                    <p className="fade-in-up-delay-1">The story behind Chikmagalur&apos;s most passionate football club</p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Our <span className="accent">Story</span>
                    </h2>
                    <p className="section-subtitle">
                        From humble beginnings to a 400+ player academy — here&apos;s our journey.
                    </p>
                    <div className="timeline">
                        {[
                            { year: "2010", text: "Coffeeland FC was founded with a vision to nurture football talent in Chikmagalur. Training began on public grounds with a handful of passionate young players." },
                            { year: "2016", text: "Officially registered as a football club. Started structured coaching programs and competitive participation in district-level tournaments." },
                            { year: "2018", text: "Launched the Football Academy with age-specific training groups. Achieved KSFA affiliation and began competing in the C-Division League." },
                            { year: "2020–2024", text: "Grew to 400+ active students. Became consistent Dasara tournament champions. Players promoted to Super Division exposure matches." },
                            { year: "2025+", text: "Expanding training centers, hosting district tournaments, and building pathways for players to advance into elite football divisions." },
                        ].map((item, i) => (
                            <div className="timeline-item" key={i}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="timeline-year">{item.year}</div>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container">
                    <div className="content-grid">
                        <div>
                            <h2>
                                Our <span className="accent">Mission</span>
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                                To build disciplined, skilled, and confident footballers through structured
                                grassroots development. We believe every child deserves access to quality coaching
                                and a pathway to achieve their full potential.
                            </p>
                            <ul className="content-list">
                                <li>Structured grassroots development programs</li>
                                <li>Character building through sport</li>
                                <li>Discipline, teamwork, and sportsmanship</li>
                                <li>Equal opportunity for all age groups</li>
                            </ul>
                        </div>
                        <div>
                            <h2>
                                Our <span className="accent">Vision</span>
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                                To represent Chikmagalur at higher competitive levels including professional
                                leagues, and to become the premier football development center in Karnataka.
                            </p>
                            <ul className="content-list">
                                <li>Compete in Super Division and beyond</li>
                                <li>Produce professional-level players</li>
                                <li>Establish a state-of-the-art training facility</li>
                                <li>Create a sustainable football ecosystem in the region</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Our <span className="accent">Leadership</span>
                    </h2>
                    <p className="section-subtitle">
                        Guided by experienced professionals passionate about developing the next generation.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                        <div className="card" style={{ textAlign: "center" }}>
                            <div style={{
                                width: "100px", height: "100px", borderRadius: "50%",
                                background: "var(--gradient-green)", margin: "0 auto 1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "2.5rem", transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg) scale(1.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
                            >
                                ⚽
                            </div>
                            <h3 style={{ marginBottom: "0.5rem" }}>Loyston</h3>
                            <p style={{ color: "var(--accent)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>
                                Technical Director
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                Leading the academy&apos;s technical development program with years of coaching experience and a passion for grassroots football.
                            </p>
                        </div>
                        <div className="card" style={{ textAlign: "center" }}>
                            <div style={{
                                width: "100px", height: "100px", borderRadius: "50%",
                                background: "var(--gradient-green)", margin: "0 auto 1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "2.5rem", transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg) scale(1.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
                            >
                                🏆
                            </div>
                            <h3 style={{ marginBottom: "0.5rem" }}>Core Management Team</h3>
                            <p style={{ color: "var(--accent)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>
                                Operations & Strategy
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                A dedicated team managing operations, events, partnerships, and ensuring the academy runs at the highest standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2 className="fade-in-up">
                        Want to be part of <span className="accent">our story?</span>
                    </h2>
                    <p className="fade-in-up-delay-1">Join the fastest-growing football academy in Chikmagalur.</p>
                    <Link href="/contact" className="btn-primary fade-in-up-delay-2" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
                        Join Coffeeland FC ⚽
                    </Link>
                </div>
            </section>
        </>
    );
}
