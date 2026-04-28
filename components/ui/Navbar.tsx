"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/achievements", label: "Achievements" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 20);
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
          <Link href="/" className="nav-logo" aria-label="Go to homepage" onClick={handleNavClick}>
            <Image className="nav-logo-mark" src="/images/logo-transparent.png" alt="Site logo" width={140} height={78} priority />
          </Link>
          <div className="nav-links">
            {NAV_ITEMS.filter((item) => item.href !== "/" && item.href !== "/contact").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "active" : ""}
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className={`nav-cta ${pathname === "/contact" ? "active" : ""}`} onClick={handleNavClick}>
              Contact
            </Link>
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
          <Link key={item.href} href={item.href} onClick={handleNavClick} className={pathname === item.href ? "active" : ""}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
