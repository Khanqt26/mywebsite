"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ROLES = ["Computer Engineering Student", "Aspiring Full-Stack Developer", "Hardware Enthusiast", "Problem Solver"];

export default function Hero() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const typewriterText = useMemo(
    () => ROLES[typeIndex].slice(0, charIndex),
    [typeIndex, charIndex]
  );

  useEffect(() => {
    const currentRole = ROLES[typeIndex];
    let delay = deleting ? 60 : 110;

    if (!deleting && charIndex === currentRole.length) {
      delay = 1800;
    }

    if (deleting && charIndex === 0) {
      delay = 400;
    }

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (charIndex < currentRole.length) {
          setCharIndex(charIndex + 1);
        } else {
          setDeleting(true);
        }
      } else if (charIndex > 0) {
        setCharIndex(charIndex - 1);
      } else {
        setDeleting(false);
        setTypeIndex((typeIndex + 1) % ROLES.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, deleting, typeIndex]);

  return (
    <section id="hero">
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I&apos;m
          </motion.div>
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Khan<br />
            <span className="outline">Adjarani</span>
          </motion.h1>
          <motion.div
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span>{typewriterText}</span>
            <span className="cursor-blink" />
          </motion.div>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            I build fast, beautiful web experiences that users love and clients remember, from landing pages to full-stack applications.
          </motion.p>
          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Link href="/projects" className="btn-primary">
              View My Work
            </Link>
            <Link href="/gallery" className="btn-outline">
              View Gallery
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="scroll-indicator">
        <span>scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
