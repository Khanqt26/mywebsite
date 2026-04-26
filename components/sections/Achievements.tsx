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
