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

function HeroSlides() {
  const [index, setIndex] = useState(0);
  const slides = [
    { image: "/team photo.jpeg", label: "First Team in Action" },
    { image: "/dasara-champions.jpeg", label: "Champions of Dasara Cup" },
    { image: "/ksfa-stadium.jpeg", label: "Competing at KSFA Stadium" },
    { image: "/tournament-winners.jpeg", label: "Tournament Winners" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-slider">
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === index ? "active" : ""}`}>
          <img src={slide.image} alt={slide.label} />
          <div className="hero-slide-caption">{slide.label}</div>
        </div>
      ))}
      <div className="hero-slider-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}></span>
        ))}
      </div>
    </div>
  );
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
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-eyebrow fade-in-up">⚽ KSFA Affiliated Football Club</span>
              <h1 className="fade-in-up">
                COFFEELAND <span className="accent">FC</span>
              </h1>
              <p className="hero-tagline fade-in-up-delay-1">Together Towards Tomorrow</p>
              <p className="hero-sub fade-in-up-delay-2">
                Chikkamagaluru's premier academy developing football talent since 2010.
                From grassroots beginners to KSFA C-Division competitors — build your football future with us.
              </p>
              <div className="hero-stats-inline fade-in-up-delay-2">
                <span className="stat-badge">🏆 <AnimatedCounter target={25} suffix="+" /> Trophies</span>
                <span className="stat-badge">👥 <AnimatedCounter target={400} suffix="+" /> Players</span>
                <span className="stat-badge">⭐ 5.0 Rating</span>
              </div>
              <div className="hero-btns fade-in-up-delay-2">
                <Link href="/contact" className="btn-primary">⚽ Join Academy</Link>
                <Link href="/events" className="btn-outline">📅 View Events</Link>
              </div>
            </div>
            <div className="hero-visual fade-in-up-delay-1">
              <HeroSlides />
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS BAR ===== */}
      <div className="quick-stats">
        <div className="container">
          <div className="quick-stats-grid">
            <div className="quick-stat">
              <span className="quick-stat-num"><AnimatedCounter target={14} suffix="+" /></span>
              <span className="quick-stat-label">Years of Football</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-num"><AnimatedCounter target={400} suffix="+" /></span>
              <span className="quick-stat-label">Active Students</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-num">6+</span>
              <span className="quick-stat-label">Age Groups</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-num">100%</span>
              <span className="quick-stat-label">KSFA Recognized</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ABOUT / INTRO ===== */}
      <section className="intro-section animate-on-scroll">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-media">
              <img src="/WhatsApp Image 2026-02-25 at 11.25.23 PM.jpeg" alt="Academy Training" className="intro-img" />
              <div className="intro-badge">
                <strong>Since</strong>
                <span>2010</span>
              </div>
            </div>
            <div className="intro-text">
              <span className="section-eyebrow">Who We Are</span>
              <h2>
                The Home of Football in <span className="accent">Chikkamagaluru</span>
              </h2>
              <p>
                Coffeeland Football Club is more than a club — it's a family united by a shared passion
                for the beautiful game. Founded in 2010 and officially registered in 2016, we develop
                players from the grassroots level to competitive excellence under the Karnataka State
                Football Association.
              </p>
              <p>
                Our experienced coaches, structured curriculum, and genuine community support help every
                player grow — on the pitch and in life.
              </p>
              <div className="intro-perks">
                <div className="perk"><span>🏅</span> KSFA Affiliated</div>
                <div className="perk"><span>🧑‍🏫</span> Expert Coaches</div>
                <div className="perk"><span>🏟️</span> League Exposure</div>
                <div className="perk"><span>👨‍👩‍👧</span> Family Community</div>
              </div>
              <Link href="/about" className="btn-outline">Learn More About Us →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials animate-on-scroll">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="section-title">
              What Our <span className="accent">Community Says</span>
            </h2>
          </div>
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

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <span className="section-eyebrow" style={{ color: "var(--accent)" }}>Join Us Today</span>
          <h2 className="fade-in-up">
            Ready to Start Your <span className="accent">Football Journey?</span>
          </h2>
          <p className="fade-in-up-delay-1">Join 400+ students already training with Coffeeland FC. Your future starts here.</p>
          <div className="cta-btns fade-in-up-delay-2">
            <Link href="/contact" className="btn-primary" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
              Enroll Now ⚽
            </Link>
            <Link href="/sponsors" className="btn-outline" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
