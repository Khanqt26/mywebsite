import Footer from "@/components/sections/Footer";
import Portfolio from "@/components/sections/Portfolio";
import PageIntro from "@/components/ui/PageIntro";

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <PageIntro
        label="Projects"
        title="A focused page for the systems and websites you’ve built."
        description="Visitors can browse your work here instead of scrolling through a long one-page layout, and the filtering still works."
      />
      <Portfolio />
      <Footer />
    </main>
  );
}
