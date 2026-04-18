"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeInSectionProps = {
  className?: string;
  children: ReactNode;
};

export default function FadeInSection({ className = "", children }: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
