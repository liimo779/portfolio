import { formatMonthYear } from "../dateFormat";
import { RevealGroup, RevealItem } from "./Reveal";
import { slideInLine } from "../motion";
import "./Timeline.css";

function Education({ education }) {
  return (
    <section id="education" className="container">
      <RevealGroup className="section-head">
        <RevealItem as="span" className="section-eyebrow">
          المؤهلات
        </RevealItem>
        <RevealItem as="h2" className="section-title">
          التعليم
        </RevealItem>
      </RevealGroup>

      <RevealGroup as="div" className="timeline" stagger={0.15}>
        {education.map((edu) => (
          <RevealItem
            key={edu.id}
            as="div"
            className="card timeline-item"
            variants={slideInLine}
            whileHover={{ y: -3 }}
          >
            <span className="timeline-period">
              {formatMonthYear(edu.start_date)} — {formatMonthYear(edu.end_date)}
            </span>
            <h3 className="timeline-title">{edu.degree}</h3>
            <p className="timeline-subtitle">
              {edu.institution}
              {edu.field ? ` · ${edu.field}` : ""}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

export default Education;
