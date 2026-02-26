"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Basic Animations on Scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("animate-on-scroll");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const registerStudent = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const age = form.querySelector('input[type="number"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const location = form.querySelector("#location-select").value;

    const studentData = { name, age, email, password, location };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      alert(`Application submitted successfully for ${name}! We will contact you soon.`);
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server. Please ensure the backend is running.");
    }
  };

  const simulatePayment = (plan) => {
    const prices = {
      Monthly: "₹1,500",
      Quarterly: "₹4,000",
      Annual: "₹14,000",
    };

    if (
      confirm(
        `Do you want to proceed with the ${plan} plan for ${prices[plan]}? \n\nThis will take you to our secure payment gateway.`
      )
    ) {
      if (confirm("Simulating Payment Process... Click OK to complete.")) {
        alert(
          `Success! You have joined Coffeeland FC on the ${plan} plan. \n\nWelcome to the academy! Check your email for orientation details.`
        );
      }
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header>
        <nav>
          <div className="logo-container">
            <img src="/coffee-land-logo.jpeg" alt="Coffeeland FC Logo" className="nav-logo" />
            <div className="logo-text">
              COFFEELAND <span>FC</span>
            </div>
          </div>

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
            <li>
              <a href="#home" onClick={closeMenu}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={closeMenu}>About</a>
            </li>
            <li>
              <a href="#sessions" onClick={closeMenu}>Sessions</a>
            </li>
            <li>
              <a href="#fees" onClick={closeMenu}>Fees</a>
            </li>
            <li>
              <a href="#prizes" onClick={closeMenu}>Prizes</a>
            </li>
            <li>
              <a href="#join" className="btn-primary" onClick={closeMenu}>Join Now</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>
              COFFEELAND FC<span>Football</span>
            </h1>
            <p>
              Est. 2010 of Coffeeland FC Football Academy<br />
              <strong>400+ Students Currently Training • All Age Groups Welcome</strong>
            </p>
            <div className="hero-btns">
              <a href="#join" className="btn-primary">
                Get Started
              </a>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <img src="/team photo.jpeg" alt="Coffeeland FC Team" className="hero-img" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <h2>
              Our <span>Heritage</span>
            </h2>
            <div className="about-grid">
              <div className="about-text">
                <p>
                  Established in 2010, our Football Academy was founded with a clear vision to nurture young talent and
                  develop disciplined, skilled, and competitive football players. The academy officially began its
                  structured training programs in 2018, focusing on grassroots development and professional-level
                  coaching. Since its inception, the academy has been committed to identifying promising players and
                  providing them with the right platform to grow. Our structured training methodology, experienced coaching
                  staff, and competitive exposure have helped players progress to higher levels of competition, including
                  participation in the Super Division League. The academy team has proudly competed in the C Division
                  League under the guidelines of the Karnataka State Football Association (KSFA), reflecting our
                  commitment to excellence and competitive standards. We believe in continuous development, discipline,
                  teamwork, and creating pathways for players to advance into elite football divisions.
                </p>
                <ul className="stats">
                  <li>
                    <strong>14+</strong> Years of Excellence
                  </li>
                  <li>
                    <strong>400+</strong> Active Students
                  </li>
                  <li>
                    <strong>All</strong> Age Groups
                  </li>
                  <li>
                    <strong>Elite</strong> Coaching Staff
                  </li>
                </ul>
              </div>
              <div className="about-image">
                <img src="/WhatsApp Image 2026-02-25 at 11.25.23 PM.jpeg" alt="Academy Training" className="glass-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Sessions Section */}
        <section id="sessions" className="sessions">
          <div className="container">
            <h2>
              Our <span>Training Centers</span>
            </h2>
            <div className="sessions-layout">
              {/* Morning Session Card */}
              <div className="session-card">
                <div className="session-header">
                  <div className="session-title">Morning Academy</div>
                  <div className="session-tag">Daily</div>
                </div>
                <div className="session-body">
                  <div className="info-row">
                    <span className="label">Ages:</span>
                    <span className="value">All Age Groups (6-18)</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Timings:</span>
                    <span className="value">6:00 AM - 8:00 AM</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Focus:</span>
                    <span className="value">Physical conditioning, core stamina, and technical basics.</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Status:</span>
                    <span className="value status-active">Enrolling Now</span>
                  </div>
                </div>
                <div className="session-footer">
                  <a href="#join" className="btn-primary full-width">
                    Register Now
                  </a>
                </div>
              </div>

              {/* Evening Session Card */}
              <div className="session-card featured">
                <div className="session-header">
                  <div className="session-title">Evening Academy</div>
                  <div className="session-tag">Daily</div>
                </div>
                <div className="session-body">
                  <div className="info-row">
                    <span className="label">Ages:</span>
                    <span className="value">All Age Groups (6-18)</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Timings:</span>
                    <span className="value">4:30 PM - 6:30 PM</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Focus:</span>
                    <span className="value">Tactical awareness, game simulations, and team chemistry.</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Status:</span>
                    <span className="value status-active">Enrolling Now</span>
                  </div>
                </div>
                <div className="session-footer">
                  <a href="#join" className="btn-primary full-width">
                    Register Now
                  </a>
                </div>
              </div>

              {/* Elite Squad Card */}
              <div className="session-card">
                <div className="session-header">
                  <div className="session-title">Elite Squad</div>
                  <div className="session-tag">Selection Based</div>
                </div>
                <div className="session-body">
                  <div className="info-row">
                    <span className="label">Groups:</span>
                    <span className="value">U9, U12, U15, U18</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Training:</span>
                    <span className="value">High Performance & Analysis</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Exposure:</span>
                    <span className="value">Super Division & C Division Exposure</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Selection:</span>
                    <span className="value status-elite">Promoted from Academy</span>
                  </div>
                </div>
                <div className="session-footer">
                  <a href="#about" className="btn-outline full-width">
                    Success Stories
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Dashboard Section */}
        <section id="awards" className="prizes" style={{ padding: "100px 0" }}>
          <div className="container animate-on-scroll">
            <h2>
              Academy <span>Awards</span>
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "1.15rem",
                marginBottom: "3rem",
              }}
            >
              Honoring the dedication, achievements, and glory of our champions!
            </p>
            <div
              className="award-container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              {/* Dasara Champions */}
              <div
                className="award-card"
                style={{
                  background: "#120e0b",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "20px",
                  padding: "20px",
                  width: "300px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src="/dasara-champions.jpeg"
                  alt="Dasara Champions"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#fdfbf7",
                  }}
                >
                  Dasara Champions
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#d1c7bd",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Consistent champions of the prestigious Chikmagalur Dasara tournament (2010 - 2024).
                </p>
              </div>

              {/* C-Division Prize */}
              <div
                className="award-card"
                style={{
                  background: "#120e0b",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "20px",
                  padding: "20px",
                  width: "300px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src="/c-division-prize.jpeg"
                  alt="C-Division Quarter Finalist"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#fdfbf7",
                  }}
                >
                  C-Division Quarter Finalist
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#d1c7bd",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Achieved Quarter Finalist status in the highly competitive C-Division league.
                </p>
              </div>

              {/* Pride */}
              <div
                className="award-card"
                style={{
                  background: "#120e0b",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "20px",
                  padding: "20px",
                  width: "300px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src="/coffee-land-logo.jpeg"
                  alt="Academy Pride"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#fdfbf7",
                  }}
                >
                  Academy Pride
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#d1c7bd",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Building the future of football in Chikmagalur through dedication and passion.
                </p>
              </div>

              {/* State Level Participation */}
              <div
                className="award-card"
                style={{
                  background: "#120e0b",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "20px",
                  padding: "20px",
                  width: "300px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src="/ksfa-stadium.jpeg"
                  alt="State Level Participation"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#fdfbf7",
                  }}
                >
                  State Level Competitors
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#d1c7bd",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Representing Chikmagalur at the highest competitive levels, including matches at the KSFA stadium.
                </p>
              </div>

              {/* Tournament Winners */}
              <div
                className="award-card"
                style={{
                  background: "#120e0b",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "20px",
                  padding: "20px",
                  width: "300px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src="/tournament-winners.jpeg"
                  alt="Tournament Champions"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#fdfbf7",
                  }}
                >
                  Tournament Champions
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#d1c7bd",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Securing hard-fought victories and lifting trophies in major regional tournaments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fees Section */}
        <section id="fees" className="fees">
          <div className="container">
            <h2>
              Academy <span>Fees</span>
            </h2>
            <div className="fee-cards">
              <div className="fee-card">
                <h3>Monthly</h3>
                <div className="price">
                  ₹1,000<span>/mo</span>
                </div>
                <p>Perfect for beginners testing their skills.</p>
                <button className="btn-outline" onClick={() => simulatePayment("Monthly")}>
                  Select Plan
                </button>
              </div>
              <div className="fee-card featured">
                <span className="badge">Most Popular</span>
                <h3>Quarterly</h3>
                <div className="price">
                  ₹4,000<span>/3mo</span>
                </div>
                <p>Consistent training and discounted kit.</p>
                <button className="btn-primary" onClick={() => simulatePayment("Quarterly")}>
                  Select Plan
                </button>
              </div>
              <div className="fee-card">
                <h3>Annual</h3>
                <div className="price">
                  ₹10,000<span>/yr</span>
                </div>
                <p>Full commitment with elite perks.</p>
                <button className="btn-outline" onClick={() => simulatePayment("Annual")}>
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section id="join" className="cta">
          <div className="container">
            <h2>
              Join the <span>Team</span>
            </h2>
            <p>Ready to level up your game? Become a part of Coffeeland FC today.</p>
            <form id="membership-form" onSubmit={registerStudent}>
              <div className="form-group">
                <input type="text" placeholder="Full Name" required />
                <input type="number" placeholder="Age" min="5" max="18" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" required />
                <input type="password" placeholder="Create a Password" required />
              </div>
              <div className="form-group">
                <select
                  id="location-select"
                  required
                  defaultValue=""
                  style={{
                    width: "100%",
                    padding: "0.8rem 1.2rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    fontFamily: "inherit",
                    fontSize: "1rem",
                  }}
                >
                  <option value="" disabled>
                    Select Training Location
                  </option>
                  <option value="District Field">District Field</option>
                  <option value="Kalyan Nagar Turf">Kalyan Nagar Turf</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>
                Submit Application
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              COFFEELAND <span>FC</span>
            </div>
            <p>&copy; 2026 Coffeeland FC Academy, Chikmagalur. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
