import { formatMonthYear } from "../dateFormat";
import { RevealGroup, RevealItem } from "./Reveal";
import { slideInLine } from "../motion";
import "./Timeline.css";

function Experience({ experience }) {
  return (
    <section id="experience" className="container">
      <RevealGroup className="section-head">
        <RevealItem as="span" className="section-eyebrow">
         
        </RevealItem>
        <RevealItem as="h2" className="section-title">
          الأنشطة
        </RevealItem>
      </RevealGroup>

      <RevealGroup as="div" className="timeline" stagger={0.15}>
        {experience.map((exp) => (
          <RevealItem
            key={exp.id}
            as="div"
            className="card timeline-item"
            variants={slideInLine}
            whileHover={{ y: -3 }}
          >
            <span className="timeline-period">
              {formatMonthYear(exp.start_date)} — {formatMonthYear(exp.end_date)}
            </span>
            <h3 className="timeline-title">{exp.role}</h3>
            <p className="timeline-subtitle">
              {exp.company}
              {exp.location ? ` · ${exp.location}` : ""}
            </p>
            {exp.description && <p className="timeline-description">{exp.description}</p>}
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

export default Experience;
