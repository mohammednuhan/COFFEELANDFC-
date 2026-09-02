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

function HomeMarquee() {
  const items = [
    "⚽ Grassroots (U8)",
    "⚽ Youth (U12–U15)",
    "⚽ Senior Team",
    "⚽ Summer Camps",
    "🏆 KSFA C-Division",
    "⚽ Match Exposure",
    "🥇 District Tournaments",
  ];
  return (
    <div className="home-marquee">
      <div className="home-marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="home-marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
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
                Chikkamagaluru&apos;s premier academy developing football talent since 2010.
                From grassroots beginners to KSFA C-Division competitors — build your football future with us.
              </p>
              <div className="hero-feature-row fade-in-up-delay-2">
                <div className="hero-feature">
                  <span className="hero-feature-icon">🏅</span>
                  <div>
                    <strong>KSFA</strong>
                    <small>Registered Club</small>
                  </div>
                </div>
                <div className="hero-feature">
                  <span className="hero-feature-icon">🧑‍🏫</span>
                  <div>
                    <strong>Elite</strong>
                    <small>Coaching Staff</small>
                  </div>
                </div>
                <div className="hero-feature">
                  <span className="hero-feature-icon">🏟️</span>
                  <div>
                    <strong>League</strong>
                    <small>Match Exposure</small>
                  </div>
                </div>
              </div>
              <div className="hero-stats-inline fade-in-up-delay-2">
                <span className="stat-badge">🏆 <AnimatedCounter target={25} suffix="+" /> Trophies</span>
                <span className="stat-badge">👥 <AnimatedCounter target={400} suffix="+" /> Players</span>
                <span className="stat-badge">⭐ 5.0 Rating</span>
              </div>
              <div className="hero-btns fade-in-up-delay-2">
                <Link href="/contact" className="btn-primary hero-cta">⚽ Join Academy</Link>
                <Link href="/events" className="btn-outline">📅 View Events</Link>
              </div>
            </div>
            <div className="hero-visual fade-in-up-delay-1">
              <div className="hero-slider-ring">
                <HeroSlides />
                <div className="hero-float-chip chip-tl">⭐ 5.0 Rated</div>
                <div className="hero-float-chip chip-br">🏆 25+ Trophies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <HomeMarquee />

      {/* ===== QUICK STATS ===== */}
      <div className="quick-stats">
        <div className="container">
          <div className="quick-stats-grid">
            <div className="quick-stat">
              <span className="quick-stat-icon">🏫</span>
              <span className="quick-stat-num"><AnimatedCounter target={14} suffix="+" /></span>
              <span className="quick-stat-label">Years of Football</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">👨‍👩‍👧‍👦</span>
              <span className="quick-stat-num"><AnimatedCounter target={400} suffix="+" /></span>
              <span className="quick-stat-label">Active Students</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">⚽</span>
              <span className="quick-stat-num">6+</span>
              <span className="quick-stat-label">Age Groups</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-icon">🏆</span>
              <span className="quick-stat-num">100%</span>
              <span className="quick-stat-label">KSFA Recognized</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
