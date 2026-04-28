import Link from "next/link";
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
            <span className="announcement-status">{homeAnnouncement.status}</span>
          </div>
          <h2 className="section-title home-announcement-title">{homeAnnouncement.title}</h2>
          <p className="home-announcement-text">{homeAnnouncement.message}</p>
          <p className="home-announcement-note">{homeAnnouncement.secondaryMessage}</p>
          <div className="hero-btns">
            <Link href={homeAnnouncement.primaryLink.href} className="btn-primary">
              {homeAnnouncement.primaryLink.label}
            </Link>
            <Link href={homeAnnouncement.secondaryLink.href} className="btn-outline">
              {homeAnnouncement.secondaryLink.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
