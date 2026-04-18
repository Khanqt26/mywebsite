"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import FadeInSection from "@/components/ui/FadeInSection";
import ProjectCard from "@/components/ui/ProjectCard";
import projects from "@/data/projects.json";

export default function Portfolio() {
  const projectTags = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((project) => project.tags)))],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProjects = useMemo(
    () =>
      selectedFilter === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(selectedFilter)),
    [selectedFilter]
  );

  return (
    <section id="portfolio">
      <div className="container">
        <FadeInSection>
          <div>
            <div className="section-label">Works</div>
            <h2 className="section-title">Selected Projects</h2>
            <div className="filter-bar">
              {projectTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`filter-btn${selectedFilter === tag ? " active" : ""}`}
                  onClick={() => setSelectedFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFilter}
                className="projects-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    image={project.img}
                    url={project.url}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
