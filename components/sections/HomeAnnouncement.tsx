import { homeAnnouncement } from "@/data/homeAnnouncement";

export default function HomeAnnouncement() {
  if (!homeAnnouncement.enabled) {
    return null;
  }

  return (
    <section className="home-announcement">
      <div className="container">
        <div className="home-announcement-card">
          <div className="home-announcement-header">
            <p className="section-label">{homeAnnouncement.badge}</p>
          </div>
          <h2 className="section-title home-announcement-title">{homeAnnouncement.title}</h2>
          <p className="home-announcement-text">{homeAnnouncement.message}</p>
        </div>
      </div>
    </section>
  );
}
