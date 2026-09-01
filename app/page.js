"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
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
      {/* ===== HERO ===== */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="fade-in-up">
            COFFEELAND <span className="accent">FC</span>
          </h1>
          <p className="hero-tagline fade-in-up-delay-1">Together Towards Tomorrow</p>
          <p className="fade-in-up-delay-2">
            Developing Football in Chikmagalur Since 2010.
            <br />
            <strong style={{ color: "var(--accent)" }}>
              <AnimatedCounter target={400} suffix="+ Students" /> • All Age Groups • KSFA Affiliated
            </strong>
          </p>
          <div className="hero-stats-inline fade-in-up-delay-2">
            <span className="stat-badge">⚽ Est. 2010</span>
            <span className="stat-badge">🏆 KSFA Affiliated</span>
            <span className="stat-badge">👥 <AnimatedCounter target={400} suffix="+" /> Players</span>
          </div>
          <div className="hero-btns fade-in-up-delay-2">
            <Link href="/contact" className="btn-primary">
              ⚽ Join Academy
            </Link>
            <Link href="/events" className="btn-secondary">
              📅 Summer Camp
            </Link>
            <Link href="/contact" className="btn-outline">
              📞 Contact Us
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="/team photo.jpeg"
            alt="Coffeeland FC Team training at the field"
            className="hero-img"
          />
        </div>
      </section>

      {/* ===== INFO STRIP ===== */}
      <div className="info-strip">
        <div className="container">
          <div className="info-strip-content">
            <div className="info-strip-item">
              <span className="icon">📍</span> Vijaya Nagar, Chikkamagaluru – 577101
            </div>
            <div className="info-strip-item">
              <span className="icon">⭐</span> <strong>5.0</strong>&nbsp;Rating (42 Google Reviews)
            </div>
            <div className="info-strip-item">
              <span className="icon">🕒</span> Open till 8 PM
            </div>
            <div className="info-strip-item">
              <span className="icon">🏆</span> KSFA Affiliated Club
            </div>
          </div>
        </div>
      </div>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="about-preview animate-on-scroll">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="/WhatsApp Image 2026-02-25 at 11.25.23 PM.jpeg"
                alt="Academy Training"
                className="glass-img"
              />
            </div>
            <div className="about-text">
              <h2>
                About <span className="accent">Coffeeland FC</span>
              </h2>
              <p>
                Coffeeland Football Club cultivates passion for the beautiful game in
                Chikkamagaluru. Founded in 2010 and officially registered in 2016, CFC focuses
                on grassroots football development and competitive excellence under KSFA.
              </p>
              <p>
                Our structured training methodology, experienced coaching staff, and competitive
                exposure have helped players progress to higher levels, including the Super
                Division League.
              </p>
              <ul className="stats">
                <li>
                  <strong><AnimatedCounter target={14} suffix="+" /></strong> Years of Excellence
                </li>
                <li>
                  <strong><AnimatedCounter target={400} suffix="+" /></strong> Active Students
                </li>
                <li>
                  <strong>All</strong> Age Groups
                </li>
                <li>
                  <strong>Elite</strong> Coaching
                </li>
              </ul>
              <Link href="/about" className="btn-outline" style={{ marginTop: "1.5rem" }}>
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="programs animate-on-scroll">
        <div className="container">
          <h2 className="section-title">
            Our <span className="accent">Programs</span>
          </h2>
          <p className="section-subtitle">
            Structured pathways for every age group, from grassroots to competitive excellence.
          </p>
          <div className="programs-grid stagger-children">
            <div className="program-card">
              <img src="/football-bg-v2.png" alt="Grassroots Training" className="program-card-img" />
              <div className="program-card-body">
                <span className="program-tag">Ages 6–8</span>
                <h3>Grassroots (U8)</h3>
                <p>Fun-based learning with ball mastery, coordination, and love for the game.</p>
                <Link href="/academy" className="btn-outline">View Details</Link>
              </div>
            </div>
            <div className="program-card">
              <img src="/dasara-champions.jpeg" alt="Youth Training" className="program-card-img" />
              <div className="program-card-body">
                <span className="program-tag">Ages 9–15</span>
                <h3>Youth (U12–U15)</h3>
                <p>Technical development, game sense, and tactical awareness for growing players.</p>
                <Link href="/academy" className="btn-outline">View Details</Link>
              </div>
            </div>
            <div className="program-card">
              <img src="/tournament-winners.jpeg" alt="Senior Team" className="program-card-img" />
              <div className="program-card-body">
                <span className="program-tag">Ages 16+</span>
                <h3>Senior Team</h3>
                <p>KSFA competitive play, C-Division league participation, and elite training.</p>
                <Link href="/academy" className="btn-outline">View Details</Link>
              </div>
            </div>
            <div className="program-card">
              <img src="/ksfa-stadium.jpeg" alt="Summer Camp" className="program-card-img" />
              <div className="program-card-body">
                <span className="program-tag">Seasonal</span>
                <h3>Summer Camps</h3>
                <p>Intensive short-term coaching camps during holidays for all skill levels.</p>
                <Link href="/events" className="btn-outline">View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials animate-on-scroll">
        <div className="container">
          <h2 className="section-title">
            What People <span className="accent">Say</span>
          </h2>
          <p className="section-subtitle">
            Hear from parents, players, and our community about the Coffeeland FC experience.
          </p>
          <div className="testimonials-container stagger-children">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <blockquote>
                &ldquo;The best football club in Chikkamagaluru, the best coaches and its family.&rdquo;
              </blockquote>
              <p className="testimonial-author">— Hruthwik Mr</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <blockquote>
                &ldquo;Best football coaching centre in Chikmagalur. My kids love training here every day.&rdquo;
              </blockquote>
              <p className="testimonial-author">— IRFAN</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <blockquote>
                &ldquo;Amazing atmosphere, disciplined coaching, and the kids have improved tremendously.&rdquo;
              </blockquote>
              <p className="testimonial-author">— Google Review</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <section className="sponsors-section animate-on-scroll">
        <div className="container">
          <h2 className="section-title">
            Proudly Supported By Our <span className="accent">Community Partners</span>
          </h2>
          <div className="sponsors-grid stagger-children">
            <div className="sponsor-placeholder">Sponsor 1</div>
            <div className="sponsor-placeholder">Sponsor 2</div>
            <div className="sponsor-placeholder">Sponsor 3</div>
            <div className="sponsor-placeholder">Sponsor 4</div>
            <div className="sponsor-placeholder">Sponsor 5</div>
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/sponsors" className="btn-outline">Become a Sponsor →</Link>
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <h2 className="fade-in-up">
            Ready to Start Your <span className="accent">Football Journey?</span>
          </h2>
          <p className="fade-in-up-delay-1">Join 400+ students already training with Coffeeland FC. Your future starts here.</p>
          <Link href="/contact" className="btn-primary fade-in-up-delay-2" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
            Enroll Now ⚽
          </Link>
        </div>
      </section>
    </>
  );
}
