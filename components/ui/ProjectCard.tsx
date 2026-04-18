"use client";

import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
};

export default function ProjectCard({ title, description, tags, image, url }: ProjectCardProps) {
  const hasImage = image.startsWith("/");
  const hasUrl = Boolean(url);

  return (
    <motion.div
      className="project-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="project-img"
        style={
          hasImage
            ? {
                backgroundImage: `linear-gradient(rgba(5, 7, 11, 0.08), rgba(5, 7, 11, 0.35)), url(${image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : { background: `${image}22` }
        }
      >
        <div className="project-img-placeholder" style={hasImage ? undefined : { color: `${image}55` }}>
          {hasImage ? "" : title}
        </div>
        <div className="project-img-overlay">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
      <div className="project-body">
        <p className="project-title">{title}</p>
        <p className="project-desc">{description}</p>
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {hasUrl ? (
          <a href={url} className="project-link" target="_blank" rel="noopener noreferrer">
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        ) : (
          <span className="project-link" aria-disabled="true">
            Link Coming Soon
          </span>
        )}
      </div>
    </motion.div>
  );
}
