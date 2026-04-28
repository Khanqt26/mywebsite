import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HomeAnnouncement from "@/components/sections/HomeAnnouncement";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HomeAnnouncement />
      <Testimonials />
      <Footer />
    </main>
  );
}
