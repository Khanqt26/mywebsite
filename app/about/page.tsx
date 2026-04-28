import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import Education from "@/components/sections/Education";
import Footer from "@/components/sections/Footer";
import PageIntro from "@/components/ui/PageIntro";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <PageIntro
        label="About"
        title="The story, skills, and milestones behind the work."
        description="This page gives your visitors a proper place to learn who you are, what you study, and the achievements that show your growth."
      />
      <About />
      <Education />
      <Achievements />
      <Footer />
    </main>
  );
}
