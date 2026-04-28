"use client";

import { motion } from "framer-motion";

const EDUCATION = [
  {
    year: "2024 - Present",
    school: "Surigao del Norte State University - Main Campus",
    degree: "Bachelor of Science in Computer Engineering",
    desc: "Currently a second-year Computer Engineering student, focusing on computer systems, software development, and hardware integration.",
  },
  {
    year: "2022 - 2024",
    school: "St. Paul University Surigao",
    degree: "Senior High School",
    desc: "Completed senior high school and strengthened my academic foundation before entering college.",
  },
  {
    year: "2018 - 2022",
    school: "Tubod National High School",
    degree: "Junior High School",
    desc: "Completed junior high school and developed strong study habits and foundational technical interest.",
  },
  {
    year: "2012 - 2018",
    school: "Tubod Central Elementary School",
    degree: "Elementary School",
    desc: "Completed elementary education and built a solid academic foundation.",
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
