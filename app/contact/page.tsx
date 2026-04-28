import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import PageIntro from "@/components/ui/PageIntro";

export default function ContactPage() {
  return (
    <main className="page-shell">
      <PageIntro
        label="Contact"
        title="A dedicated contact page for projects, collaborations, and inquiries."
        description="Instead of ending in a single long scroll, visitors can now go straight to your contact page when they’re ready to reach out."
      />
      <Contact />
      <Footer />
    </main>
  );
}
