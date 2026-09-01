"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AcademyPage() {
    const [showFees, setShowFees] = useState(false);

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
                        The <span className="accent">Academy</span>
                    </h1>
                    <p className="fade-in-up-delay-1">Where champions are made — structured training for every age group</p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Why Choose <span className="accent">Coffeeland FC?</span>
                    </h2>
                    <p className="section-subtitle">
                        We provide a professional, nurturing environment for aspiring footballers.
                    </p>
                    <div className="programs-grid stagger-children">
                        {[
                            { icon: "🎯", title: "Qualified Coaches", desc: "Certified and experienced coaching staff focused on player development." },
                            { icon: "📋", title: "Structured Sessions", desc: "Age-appropriate training plans with progressive skill development." },
                            { icon: "💪", title: "Discipline & Fitness", desc: "Building physical endurance, mental strength, and healthy habits." },
                            { icon: "🌟", title: "Character Building", desc: "Teamwork, sportsmanship, and leadership skills on and off the field." },
                        ].map((item, i) => (
                            <div className="card" key={i} style={{ textAlign: "center" }}>
                                <div style={{
                                    fontSize: "2.5rem", marginBottom: "1rem",
                                    transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.3) rotate(-10deg)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) rotate(0)"}
                                >{item.icon}</div>
                                <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Age <span className="accent">Categories</span>
                    </h2>
                    <p className="section-subtitle">
                        Tailored training programs for different age groups and skill levels.
                    </p>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Age Group</th>
                                <th>Focus Area</th>
                                <th>Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { cat: "U8 — Grassroots", age: "6 – 8 years", focus: "Ball mastery, coordination, and fun-based learning", sched: "Mon – Sat" },
                                { cat: "U12 — Development", age: "9 – 12 years", focus: "Technique, game sense, and small-sided games", sched: "Mon – Sat" },
                                { cat: "U15 — Competitive", age: "13 – 15 years", focus: "Tactical play, match simulation, and tournament prep", sched: "Mon – Sat" },
                                { cat: "Senior — Elite", age: "16+ years", focus: "KSFA competition, C-Division & Super Division exposure", sched: "Daily" },
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td><strong style={{ color: "var(--text)" }}>{row.cat}</strong></td>
                                    <td>{row.age}</td>
                                    <td>{row.focus}</td>
                                    <td>{row.sched}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Training <span className="accent">Locations</span>
                    </h2>
                    <p className="section-subtitle">Our training centers in Chikmagalur.</p>
                    <div className="programs-grid">
                        <div className="card gold-border">
                            <h3 style={{ marginBottom: "0.8rem" }}>🏟️ District Field</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Morning Session:</strong> 6:00 AM – 8:00 AM
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Evening Session:</strong> 4:30 PM – 6:30 PM
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                Main training ground for all age groups. Natural grass turf.
                            </p>
                        </div>
                        <div className="card gold-border">
                            <h3 style={{ marginBottom: "0.8rem" }}>⚽ Kalyan Nagar Turf</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                                <strong style={{ color: "var(--text)" }}>Evening Session:</strong> 4:30 PM – 6:30 PM
                            </p>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                Dedicated turf facility for focused training and match practice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: "var(--bg-alt)" }} className="animate-on-scroll">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 className="section-title">
                        Fee <span className="accent">Structure</span>
                    </h2>
                    <p className="section-subtitle">
                        Affordable plans to make football accessible to everyone.
                    </p>
                    {!showFees ? (
                        <div>
                            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                                Click below to view our fee structure.
                            </p>
                            <button className="btn-primary" onClick={() => setShowFees(true)}>
                                View Fee Structure
                            </button>
                        </div>
                    ) : (
                        <div className="packages-grid stagger-children">
                            <div className="package-card">
                                <h3>Monthly</h3>
                                <div className="package-price">₹1,000<small>/mo</small></div>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Perfect for beginners testing their skills.</p>
                                <Link href="/contact" className="btn-outline full-width">Enroll Now</Link>
                            </div>
                            <div className="package-card featured" style={{ position: "relative" }}>
                                <span className="badge">Most Popular</span>
                                <h3>Quarterly</h3>
                                <div className="package-price">₹4,000<small>/3mo</small></div>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Consistent training with discounted rate.</p>
                                <Link href="/contact" className="btn-primary full-width">Enroll Now</Link>
                            </div>
                            <div className="package-card">
                                <h3>Annual</h3>
                                <div className="package-price">₹10,000<small>/yr</small></div>
                                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Full commitment with elite perks.</p>
                                <Link href="/contact" className="btn-outline full-width">Enroll Now</Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="animate-on-scroll">
                <div className="container">
                    <h2 className="section-title">
                        Training <span className="accent">Gallery</span>
                    </h2>
                    <p className="section-subtitle">Snapshots from the field — action, dedication, and teamwork.</p>
                    <div className="gallery-grid stagger-children">
                        {[
                            { src: "/team photo.jpeg", alt: "Team Photo" },
                            { src: "/dasara-champions.jpeg", alt: "Dasara Champions" },
                            { src: "/tournament-winners.jpeg", alt: "Tournament Winners" },
                            { src: "/c-division-prize.jpeg", alt: "C-Division" },
                            { src: "/ksfa-stadium.jpeg", alt: "KSFA Stadium" },
                            { src: "/WhatsApp Image 2026-02-25 at 11.25.23 PM.jpeg", alt: "Training Session" },
                        ].map((img, i) => (
                            <div className="gallery-item" key={i}>
                                <img src={img.src} alt={img.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <h2 className="fade-in-up">Ready to <span className="accent">Join the Academy?</span></h2>
                    <p className="fade-in-up-delay-1">Take the first step towards your football career with Coffeeland FC.</p>
                    <Link href="/contact" className="btn-primary fade-in-up-delay-2" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
                        Register Now ⚽
                    </Link>
                </div>
            </section>
        </>
    );
}
