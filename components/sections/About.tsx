"use client";

import FadeInSection from "@/components/ui/FadeInSection";
import Image from "next/image";

const SKILLS = [
  // Programming Languages
  "Python",
  "C++",
  "JavaScript",
  "PHP",
  // Frameworks / Libraries
  "Node.js",
  "Express.js",
  "Bootstrap",
  // Tools & Platforms
  "Git & GitHub",
  "VS Code",
  "Arduino / Microcontrollers",
  // Design Tools
  "Figma",
  "Canva",
  // Other Skills
  "Hardware Integration",
  "Database Management (MySQL)",
  "Debugging & Troubleshooting",
  "Basic Networking",
];

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <FadeInSection>
          <div className="about-grid">
            <div>
              <div className="about-photo-wrap">
                <Image
                  src="/images/profile-2026.jpg"
                  alt="Khan Adjarani - Computer Engineering Student"
                  width={896}
                  height={1113}
                  sizes="(max-width: 768px) 88vw, (max-width: 1200px) 46vw, 420px"
                  quality={100}
                  unoptimized
                  className="about-photo"
                  priority
                />
                <div className="about-photo-frame" />
              </div>
            </div>

            <div>
              <div className="section-label">About</div>
              <h2 className="section-title">About Me</h2>
              <p className="about-bio">
                I am Khan Adjarani, a <strong>Computer Engineering student and aspiring full-stack developer</strong> based in the Philippines with a strong interest in software development and hardware integration. I enjoy building practical systems that solve real-world problems, especially projects that combine programming with physical devices.
              </p>
              <p className="about-bio">
                I have experience working on academic and personal projects such as a coffee vending machine system and a digital clinic monitoring system. These projects helped me develop skills in coding, system design, and problem-solving. I am passionate about learning new technologies and continuously improving my technical abilities.
              </p>
              <p className="about-bio">
                I believe in creating efficient, user-friendly, and reliable solutions. I aim to grow as a developer by working on meaningful projects and collaborating with others who share the same drive for innovation.
              </p>
              <div>
                <p className="skills-title">Tech & Tools</p>
                <div className="skills-grid">
                  {SKILLS.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
