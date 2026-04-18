"use client";

import { motion } from "framer-motion";

const EDUCATION = [
  {
    year: "2022 - Present",
    school: "Surigao del Norte State University - Main Campus",
    degree: "Bachelor of Science in Computer Engineering",
    desc: "Currently in my second year, focusing on computer systems, software development, and hardware integration. Actively involved in academic projects combining programming with physical systems.",
  },
  {
    year: "2021 - 2022",
    school: "Surigao del Norte State University - Main Campus",
    degree: "Bachelor of Science in Computer Engineering",
    desc: "Built a strong foundation in programming through courses in Object-Oriented Programming, Programming Logic and Design, and Data Structures and Algorithms.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="section-label">Education</div>
          <h2 className="section-title">Background</h2>
          <div className="timeline">
            {EDUCATION.map((item, index) => (
              <motion.div
                key={`${item.school}-${item.year}`}
                className="timeline-item"
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
              >
                <div className="timeline-dot" />
                <p className="timeline-year">{item.year}</p>
                <p className="timeline-school">{item.school}</p>
                <p className="timeline-degree">{item.degree}</p>
                <p className="timeline-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
