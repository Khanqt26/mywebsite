"use client";

import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import FadeInSection from "@/components/ui/FadeInSection";

interface Testimonial {
  id?: string;
  name: string;
  message: string;
  role: string;
  company: string;
  date: string;
}

const getFirebaseErrorCode = (error: unknown): string | null => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return null;
  }

  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : null;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionError, setCollectionError] = useState("");
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialMessage, setTestimonialMessage] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("");
  const [testimonialCompany, setTestimonialCompany] = useState("");
  const [testimonialFeedback, setTestimonialFeedback] = useState("");
  const [testimonialFeedbackType, setTestimonialFeedbackType] = useState<"success" | "error" | "">("");
  const [testimonialSubmitting, setTestimonialSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const testimonialsData: Testimonial[] = [];
        querySnapshot.forEach((doc) => {
          testimonialsData.push({ id: doc.id, ...doc.data() } as Testimonial);
        });
        setTestimonials(testimonialsData);
        setCollectionError("");
        setLoading(false);
      },
      (error) => {
        const code = getFirebaseErrorCode(error);
        console.error("Testimonial listener error:", error);
        setLoading(false);
        if (code === "permission-denied") {
          setCollectionError("Testimonials are temporarily unavailable due to Firestore permissions.");
          return;
        }

        setCollectionError("Unable to load testimonials right now. Please try again later.");
      }
    );
    return unsubscribe;
  }, []);

  const previewHasContent = testimonialName.trim().length > 0 || testimonialMessage.trim().length > 0;
  const previewDate = useMemo(
    () => new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    []
  );

  const submitTestimonial = async () => {
    if (!testimonialName.trim() || !testimonialMessage.trim() || !testimonialRole.trim() || !testimonialCompany.trim()) {
      setTestimonialFeedbackType("error");
      setTestimonialFeedback("Please fill in all fields.");
      return;
    }

    if (testimonialMessage.trim().length < 10) {
      setTestimonialFeedbackType("error");
      setTestimonialFeedback("Your message is too short — please add more detail.");
      return;
    }

    setTestimonialSubmitting(true);
    setTestimonialFeedback("");

    try {
      await addDoc(collection(db, "testimonials"), {
        name: testimonialName.trim(),
        message: testimonialMessage.trim(),
        role: testimonialRole.trim(),
        company: testimonialCompany.trim(),
        date: new Date().toISOString(),
      });
      setTestimonialName("");
      setTestimonialMessage("");
      setTestimonialRole("");
      setTestimonialCompany("");
      setTestimonialFeedbackType("success");
      setTestimonialFeedback("Thank you! Your testimonial has been submitted.");
    } catch (error) {
      const code = getFirebaseErrorCode(error);
      console.error('Testimonial submission error:', error);
      setTestimonialFeedbackType("error");
      if (code === "permission-denied") {
        setTestimonialFeedback("Submission is blocked by Firestore permissions. Please update your Firebase rules.");
      } else {
        setTestimonialFeedback("Failed to submit testimonial. Please try again.");
      }
    } finally {
      setTestimonialSubmitting(false);
    }
  };

  return (
    <section id="testimonials">
      <div className="container">
        <FadeInSection>
          <div>
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">Client Feedback</h2>
            <motion.div
              className="testimonials-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {loading ? (
                <div className="loading-state">
                  <p>Loading testimonials...</p>
                </div>
              ) : collectionError ? (
                <div className="empty-state">
                  <p>{collectionError}</p>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="empty-state">
                  <p>No testimonials yet. Be the first to leave one!</p>
                </div>
              ) : (
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id || `${testimonial.name}-${index}`}
                    className="testimonial-card"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="testimonial-quote">&quot;</span>
                    <p className="testimonial-text">{testimonial.message}</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">{testimonial.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="author-name">{testimonial.name}</p>
                        <p className="author-role">{testimonial.role} at {testimonial.company}</p>
                        <p className="author-date">{new Date(testimonial.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>

          <div className="testimonial-form-section">
            <div>
              <p className="form-title">Leave a Testimonial</p>
              <div className="input-group">
                <label className="input-label" htmlFor="t-name">
                  Your name
                </label>
                <input
                  className="form-input"
                  id="t-name"
                  type="text"
                  placeholder="e.g. Maria Santos"
                  autoComplete="off"
                  value={testimonialName}
                  onChange={(event) => setTestimonialName(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="t-role">
                  Your role
                </label>
                <input
                  className="form-input"
                  id="t-role"
                  type="text"
                  placeholder="e.g. Product Manager"
                  autoComplete="off"
                  value={testimonialRole}
                  onChange={(event) => setTestimonialRole(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="t-company">
                  Your company
                </label>
                <input
                  className="form-input"
                  id="t-company"
                  type="text"
                  placeholder="e.g. TechCorp"
                  autoComplete="off"
                  value={testimonialCompany}
                  onChange={(event) => setTestimonialCompany(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="t-msg">
                  Your message
                </label>
                <textarea
                  className="form-textarea"
                  id="t-msg"
                  placeholder="Share your experience working with me..."
                  value={testimonialMessage}
                  onChange={(event) => setTestimonialMessage(event.target.value)}
                />
              </div>
              <button className="btn-primary" type="button" onClick={submitTestimonial} disabled={testimonialSubmitting}>
                {testimonialSubmitting ? "Submitting..." : "Submit Testimonial"}
              </button>
              {testimonialFeedback ? (
                <div className={`form-message ${testimonialFeedbackType}`}>{testimonialFeedback}</div>
              ) : null}
            </div>

            <div>
              <p className="form-title" style={{ color: "var(--muted)", fontSize: "1rem" }}>
                Live Preview
              </p>
              <div className={`preview-card${previewHasContent ? " has-content" : ""}`}>
                {!previewHasContent ? (
                  <div className="preview-empty">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    Start typing to see a live preview
                  </div>
                ) : (
                  <div id="previewContent">
                    <span className="testimonial-quote">&quot;</span>
                    <p className="testimonial-text">{testimonialMessage.trim() || "Your testimonial will appear here..."}</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">{testimonialName.trim() ? testimonialName.trim().charAt(0).toUpperCase() : "?"}</div>
                      <div>
                        <p className="author-name">{testimonialName.trim() || "Your name"}</p>
                        <p className="author-role">{testimonialRole.trim() || "Your role"} at {testimonialCompany.trim() || "Your company"}</p>
                        <p className="author-date">{previewDate}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
