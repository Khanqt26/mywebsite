import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";
import { achievements } from "@/data/achievements";

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <FadeInSection>
          <div className="achievements-header">
            <div className="section-label">Achievements</div>
            <h2 className="section-title">Certificates, Awards, and Milestones</h2>
            <p className="achievements-intro">
              A place to showcase certificates, competition photos, recognitions, and other moments that reflect your growth.
            </p>
          </div>

          {achievements.length > 0 ? (
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <article key={achievement.id} className="achievement-card">
                  <div className="achievement-media">
                    {achievement.image ? (
                      <Image
                        src={achievement.image}
                        alt={achievement.imageAlt ?? achievement.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="achievement-image"
                      />
                    ) : (
                      <div className="achievement-placeholder">
                        <span>Add Photo or Certificate</span>
                      </div>
                    )}
                    <span className="achievement-category">{achievement.category}</span>
                  </div>

                  <div className="achievement-body">
                    <p className="achievement-date">{achievement.date}</p>
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <p className="achievement-issuer">{achievement.issuer}</p>
                    <p className="achievement-description">{achievement.description}</p>

                    {achievement.highlights?.length ? (
                      <div className="achievement-highlights">
                        {achievement.highlights.map((highlight) => (
                          <span key={highlight} className="tag">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {achievement.href ? (
                      <a
                        href={achievement.href}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Proof
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="achievements-empty">
              <p className="achievements-empty-title">Your achievements section is ready.</p>
              <p className="achievements-empty-text">
                Add your certificates and photos in <code>data/achievements.ts</code>, then place the image files in <code>public/images/achievements/</code>.
              </p>
            </div>
          )}
        </FadeInSection>
      </div>
    </section>
  );
}
