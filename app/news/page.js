"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function NewsPage() {
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
                        Club <span className="accent">News</span>
                    </h1>
                    <p>Stay updated with the latest match results, player achievements, and announcements</p>
                </div>
            </div>

            {/* News Feed */}
            <section className="animate-on-scroll" style={{ background: "var(--bg)" }}>
                <div className="container" style={{ maxWidth: "900px" }}>

                    <article className="card gold-border" style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="badge" style={{ background: "var(--primary)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", color: "var(--white)" }}>
                                Match Result
                            </span>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>March 8, 2026</span>
                        </div>
                        <h2 style={{ fontSize: "1.8rem" }}>CFC Senior Team Secures Crucial 2-1 Victory</h2>
                        <img src="/c-division-prize.jpeg" alt="Match Details" style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }} />
                        <p style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1.05rem" }}>
                            In a thrilling encounter at the District Field, Coffeeland FC's Senior Team produced a magnificent comeback to win 2-1 against rivals. After conceding an early penalty, two second-half goals from our academy graduates secured all three points in the C-Division League.
                        </p>
                        <Link href="/contact" className="btn-outline" style={{ display: "inline-block", alignSelf: "flex-start", marginTop: "1rem" }}>
                            Read Full Report
                        </Link>
                    </article>

                    <article className="card" style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="badge" style={{ background: "var(--accent)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", color: "var(--bg)" }}>
                                Announcement
                            </span>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>February 28, 2026</span>
                        </div>
                        <h2 style={{ fontSize: "1.8rem" }}>Registration Open for Summer Football Camp 2026</h2>
                        <p style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1.05rem" }}>
                            We are excited to announce our annual Summer Football Camp for boys and girls aged 6 to 15. The camp will focus on intensive skill development, small-sided games, and fostering a deep love for the sport. Spaces are limited, so early booking is highly recommended!
                        </p>
                        <Link href="/events" className="btn-outline" style={{ display: "inline-block", alignSelf: "flex-start", marginTop: "1rem" }}>
                            View Camp Details
                        </Link>
                    </article>

                    <article className="card" style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="badge" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", color: "var(--text)" }}>
                                Player Achievement
                            </span>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>February 15, 2026</span>
                        </div>
                        <h2 style={{ fontSize: "1.8rem" }}>Three CFC Youth Players Selected for State Trials</h2>
                        <img src="/tournament-winners.jpeg" alt="Youth Players" style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }} />
                        <p style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1.05rem" }}>
                            Massive congratulations to Rohan, Aarav, and Karthik from our U15 squad for being shortlisted for the Karnataka State team trials. This is a testament to their hard work, dedication, and the structured pathway provided by the Coffeeland FC coaching staff.
                        </p>
                    </article>

                    <div style={{ textAlign: "center", marginTop: "3rem" }}>
                        <button className="btn-secondary">Load More News</button>
                    </div>

                </div>
            </section>
        </>
    );
}
