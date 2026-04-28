import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";
import { achievementCertificates, achievementEvents } from "@/data/achievements";

export default function Achievements() {
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
              {achievementEvents.map((event) => (
                <article key={event.id} className="event-showcase-card">
                  <div className="event-showcase-gallery">
                    <div className="event-gallery-track">
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
              ))}
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
