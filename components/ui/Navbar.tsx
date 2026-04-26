"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "portfolio", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "hero";
      const sections = ["hero", "about", "education", "achievements", "portfolio", "testimonials", "contact"];
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 120) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleMenu = useCallback(() => {
    setMobileOpen((current) => !current);
  }, []);

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label="Go to top">
            <Image className="nav-logo-mark" src="/images/logo-transparent.png" alt="Site logo" width={140} height={78} priority />
          </a>
          <div className="nav-links">
            {NAV_ITEMS.filter((item) => item.id !== "hero" && item.id !== "contact").map((item) => (
              <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""} onClick={handleNavClick}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className={`nav-cta ${activeSection === "contact" ? "active" : ""}`} onClick={handleNavClick}>
              Contact
            </a>
          </div>
          <button type="button" className={mobileOpen ? "hamburger open" : "hamburger"} onClick={toggleMenu} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={mobileOpen ? "mobile-menu open" : "mobile-menu"}>
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={handleNavClick}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
