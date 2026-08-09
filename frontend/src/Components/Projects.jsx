import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "./Reveal";
import "./Projects.css";

function Projects({ projects }) {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <RevealGroup className="section-head">
          <RevealItem as="span" className="section-eyebrow">
            أعمالي
          </RevealItem>
          <RevealItem as="h2" className="section-title">
            المشاريع
          </RevealItem>
          <RevealItem as="p" className="section-subtitle">
            مجموعة من المشاريع التي عكست فيها مهاراتي في بناء تطبيقات ويب Full-Stack.
          </RevealItem>
        </RevealGroup>

        <RevealGroup as="div" className="projects-grid" stagger={0.12}>
          {projects.map((project) => (
            <RevealItem
              key={project.id}
              as="article"
              className="card project-card"
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {Boolean(project.featured) && <span className="project-featured">مميز</span>}

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {project.tech_stack && (
                <div className="project-tech">
                  {project.tech_stack.split(",").map((tech) => (
                    <span key={tech} className="badge">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-links">
                {project.github_url && (
                  <motion.a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    الكود المصدري
                  </motion.a>
                )}
                {project.live_url && (
                  <motion.a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    عرض مباشر
                  </motion.a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default Projects;
