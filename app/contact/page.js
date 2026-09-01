"use client";

import { useEffect, useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            name: `${form.firstName.value} ${form.lastName.value}`.trim(),
            age: 0,
            email: form.email.value,
            password: "contact-form",
            location: form.phone.value,
        };

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) setSubmitted(true);
            else alert("Something went wrong. Please try again.");
        } catch {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="fade-in-up">
                        Get in <span className="accent">Touch</span>
                    </h1>
                    <p className="fade-in-up-delay-1">Have questions about admissions, sponsorships, or summer camps? Reach out to us.</p>
                </div>
            </div>

            <section className="animate-on-scroll">
                <div className="container">
                    <div className="contact-grid">

                        <div>
                            <h2 style={{ marginBottom: "1.5rem", fontSize: "2rem" }}>
                                Contact <span className="accent">Information</span>
                            </h2>

                            <div className="contact-info-cards stagger-children">
                                <div className="contact-card">
                                    <div className="icon">📍</div>
                                    <div>
                                        <h4>Training Ground Address</h4>
                                        <p>District Field, Vijaya Nagar, Chikkamagaluru – 577101, Karnataka, India</p>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <div className="icon">📞</div>
                                    <div>
                                        <h4>Phone / WhatsApp</h4>
                                        <p>+91 XXXXX XXXXX</p>
                                        <a href="#" className="btn-green" style={{ display: "inline-block", marginTop: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                                            Chat on WhatsApp
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <div className="icon">🕒</div>
                                    <div>
                                        <h4>Working Hours</h4>
                                        <p>Training: 6:00 AM – 8:00 AM & 4:30 PM – 6:30 PM<br />Office support open till 8:00 PM</p>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <div className="icon">✉️</div>
                                    <div>
                                        <h4>Emails</h4>
                                        <p>info@coffeelandfc.com<br />academy@coffeelandfc.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.86650422119!2d75.76077307584149!3d13.317578204642296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbad79008985555%3A0xe7a5d9111c1ea6b6!2sVijayapura%2C%20Chikkamagaluru%2C%20Karnataka%20577101!5e0!3m2!1sen!2sin!4v1703649582101!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        <div>
                            <div className="form-container" style={{ width: "100%", maxWidth: "100%" }}>
                                <h2 style={{ marginBottom: "0.5rem", fontSize: "1.8rem" }}>Send us a <span className="accent">Message</span></h2>
                                <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Fill out the form below and our team will respond shortly.</p>

                                {submitted ? (
                                    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                                        <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Thank You!</h3>
                                        <p style={{ color: "var(--text-muted)" }}>Your message has been sent. We&apos;ll get back to you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <div>
                                                <label htmlFor="firstName">First Name *</label>
                                                <input type="text" id="firstName" name="firstName" required placeholder="John" />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="text" id="lastName" name="lastName" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div className="form-group full">
                                            <label htmlFor="email">Email Address *</label>
                                            <input type="email" id="email" name="email" required placeholder="john@example.com" />
                                        </div>

                                        <div className="form-group full">
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input type="tel" id="phone" name="phone" required placeholder="+91 98765 43210" />
                                        </div>

                                        <div className="form-group full">
                                            <label htmlFor="inquiryType">Type of Inquiry *</label>
                                            <select id="inquiryType" name="inquiryType" required defaultValue="">
                                                <option value="" disabled>Select an option...</option>
                                                <option value="academy">Academy Registration</option>
                                                <option value="summerCamp">Summer Camp</option>
                                                <option value="sponsorship">Sponsorship / Partnerships</option>
                                                <option value="events">Tournaments & Events</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="form-group full">
                                            <label htmlFor="message">Your Message *</label>
                                            <textarea id="message" name="message" required placeholder="How can we help you?"></textarea>
                                        </div>

                                        <button type="submit" className="btn-primary full-width" style={{ marginTop: "1rem", fontSize: "1.05rem" }}>
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
