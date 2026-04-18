"use client";

import { useState } from "react";
import FadeInSection from "@/components/ui/FadeInSection";

export default function Contact() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactFeedback, setContactFeedback] = useState("");
  const [contactFeedbackType, setContactFeedbackType] = useState<"success" | "error" | "">("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactCooldown, setContactCooldown] = useState(false);

  const submitContact = async () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactFeedbackType("error");
      setContactFeedback("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setContactFeedbackType("error");
      setContactFeedback("Please enter a valid email address.");
      return;
    }

    setContactSubmitting(true);
    setContactFeedback("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim(),
          message: contactMessage.trim(),
        }),
      });

      if (response.ok) {
        setContactFeedbackType("success");
        setContactFeedback("Message sent! I'll get back to you soon.");
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
        setContactCooldown(true);
        setTimeout(() => setContactCooldown(false), 30000);
      } else {
        const errorData = await response.json();
        setContactFeedbackType("error");
        setContactFeedback(errorData.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setContactFeedbackType("error");
      setContactFeedback("Network error. Please check your connection and try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <FadeInSection>
          <div className="contact-grid">
            <div>
              <div className="section-label">Contact</div>
              <h2 className="contact-heading">
                Let&apos;s work<br />
                <span>together.</span>
              </h2>
              <p className="contact-desc">
                Have a project in mind or want to discuss how we can collaborate? Fill out the form and I&apos;ll get back to you as soon as possible — usually within 24 hours.
              </p>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">Khan.adjarani657@gmail.com</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">Location</p>
                  <p className="contact-info-value">Tubod, Surigao del Norte</p>
                </div>
              </div>
              <div className="availability">
                <div className="avail-dot" />
                <span className="avail-text">Available for projects</span>
              </div>
            </div>

            <div className="contact-form-card">
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label" htmlFor="c-name">
                    Full Name *
                  </label>
                  <input
                    className="form-input"
                    id="c-name"
                    type="text"
                    placeholder="Your full name"
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label" htmlFor="c-email">
                    Email *
                  </label>
                  <input
                    className="form-input"
                    id="c-email"
                    type="email"
                    placeholder="your@email.com"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="c-subject">
                  Subject
                </label>
                <input
                  className="form-input"
                  id="c-subject"
                  type="text"
                  placeholder="What&apos;s this about?"
                  value={contactSubject}
                  onChange={(event) => setContactSubject(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="c-message">
                  Message *
                </label>
                <textarea
                  className="form-textarea"
                  id="c-message"
                  style={{ minHeight: 140 }}
                  placeholder="Tell me about your project..."
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                />
              </div>
              <button className="btn-submit" type="button" onClick={submitContact} disabled={contactSubmitting || contactCooldown}>
                {contactSubmitting ? "Sending..." : "Send Message"}
              </button>
              {contactFeedback ? <div className={`form-message ${contactFeedbackType}`}>{contactFeedback}</div> : null}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
