import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "./Reveal";
import { viewportOnce } from "../motion";
import "./Skills.css";

function groupByCategory(skills) {
  return skills.reduce((groups, skill) => {
    const category = skill.category || "أخرى";
    if (!groups[category]) groups[category] = [];
    groups[category].push(skill);
    return groups;
  }, {});
}

function SkillBar({ skill }) {
  return (
    <div className="skill-row">
      <div className="skill-row-head">
        <span>{skill.name}</span>
        <span className="skill-row-level">{skill.level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

function Skills({ skills }) {
  const grouped = groupByCategory(skills);

  return (
    <section id="skills" className="skills">
      <div className="container">
        <RevealGroup className="section-head">
          <RevealItem as="span" className="section-eyebrow">
            الخبرات التقنية
          </RevealItem>
          <RevealItem as="h2" className="section-title">
            المهارات
          </RevealItem>
          <RevealItem as="p" className="section-subtitle">
            الأدوات والتقنيات التي أستخدمها لبناء تطبيقات ويب متكاملة من الواجهة إلى قاعدة البيانات.
          </RevealItem>
        </RevealGroup>

        <RevealGroup as="div" className="skills-grid" stagger={0.1}>
          {Object.entries(grouped).map(([category, items]) => (
            <RevealItem key={category} as="div" className="card skills-card" whileHover={{ y: -4 }}>
              <h3 className="skills-card-title">{category}</h3>

              <div className="skills-list">
                {items.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} />
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default Skills;
