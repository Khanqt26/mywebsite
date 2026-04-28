import Link from "next/link";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Portfolio />
      <section className="home-cta-section">
        <div className="container">
          <div className="home-cta-card">
            <p className="section-label">Explore More</p>
            <h2 className="section-title">Your portfolio now has dedicated pages.</h2>
            <p className="home-cta-text">
              Send visitors to a full about page, a swipeable gallery, and a separate contact page so the site feels more like a complete website than a single scroll.
            </p>
            <div className="hero-btns">
              <Link href="/gallery" className="btn-primary">
                Open Gallery
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
