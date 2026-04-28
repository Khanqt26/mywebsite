"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FadeInSection from "@/components/ui/FadeInSection";
import { achievementCertificates, achievementEvents } from "@/data/achievements";

const AUTO_ADVANCE_MS = 3000;

export default function Achievements() {
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>({});

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlides((current) => {
        const next = { ...current };

        for (const event of achievementEvents) {
          if (event.photos.length <= 1) {
            next[event.id] = 0;
            continue;
          }

          const currentIndex = current[event.id] ?? 0;
          next[event.id] = (currentIndex + 1) % event.photos.length;
        }

        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="achievements">
      <div className="container">
        <FadeInSection>
          <div className="achievements-page-header">
            <div className="section-label">Achievements</div>
            <h1 className="section-title">Events Attended and Certificates</h1>
          </div>

          <div className="achievement-group">
            <div className="achievement-group-heading">
              <h2 className="achievement-group-title">Events Attended</h2>
            </div>

            <div className="event-showcase-list">
              {achievementEvents.map((event) => {
                const activeIndex = activeSlides[event.id] ?? 0;

                return (
                  <article key={event.id} className="event-showcase-card">
                    <div className="event-showcase-gallery">
                      <div
                        className="event-gallery-track"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                      >
                        {event.photos.map((photo, index) => (
                          <div key={`${event.id}-${index}`} className="event-gallery-slide">
                            <div className="event-gallery-image-wrap">
                              <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="event-gallery-image"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {event.photos.length > 1 ? (
                        <div className="event-gallery-dots" aria-label="Event photo slides">
                          {event.photos.map((photo, index) => (
                            <button
                              key={`${event.id}-dot-${index}`}
                              type="button"
                              className={`event-gallery-dot${index === activeIndex ? " active" : ""}`}
                              onClick={() => setActiveSlides((current) => ({ ...current, [event.id]: index }))}
                              aria-label={`Show photo ${index + 1} for ${event.title}`}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="event-showcase-body">
                      <p className="achievement-date">{event.date}</p>
                      <h3 className="achievement-title">{event.title}</h3>
                      <p className="achievement-issuer">{event.organizer}</p>
                      <p className="achievement-description">{event.description}</p>

                      {event.highlights?.length ? (
                        <div className="achievement-highlights">
                          {event.highlights.map((highlight) => (
                            <span key={highlight} className="tag">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="achievement-group">
            <div className="achievement-group-heading">
              <h2 className="achievement-group-title">Certificates</h2>
            </div>

            <div className="achievements-grid">
              {achievementCertificates.map((certificate) => (
                <article key={certificate.id} className="achievement-card">
                  <div className="achievement-media">
                    <Image
                      src={certificate.image}
                      alt={certificate.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="achievement-image"
                    />
                    <span className="achievement-category">Certificate</span>
                  </div>

                  <div className="achievement-body">
                    <p className="achievement-date">{certificate.date}</p>
                    <h3 className="achievement-title">{certificate.title}</h3>
                    <p className="achievement-issuer">{certificate.issuer}</p>
                    <p className="achievement-description">{certificate.description}</p>

                    {certificate.highlights?.length ? (
                      <div className="achievement-highlights">
                        {certificate.highlights.map((highlight) => (
                          <span key={highlight} className="tag">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
