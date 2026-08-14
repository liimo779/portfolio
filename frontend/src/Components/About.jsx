import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "./Reveal";
import { useCountUp } from "../useCountUp";
import "./About.css";

function StatCard({ label, value, prefix = "" }) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <RevealItem as="div" className="card about-stat" ref={ref} whileHover={{ y: -4 }}>
      <span className="about-stat-value">
        {prefix}
        {animated}
      </span>
      <span className="about-stat-label">{label}</span>
    </RevealItem>
  );
}

function About({ profile, skills, projects, experience }) {
  const stats = [
    { label: "مشروع منجز", value: projects.length },
    { label: "مهارة تقنية", value: skills.length },
    { label: "انشطه", value: experience.length },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <RevealGroup className="section-head">
          <RevealItem as="span" className="section-eyebrow">
           
          </RevealItem>
          <RevealItem as="h2" className="section-title">
            نبذة عني
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="about-grid" stagger={0.15}>
          <RevealItem as="div" className="card about-bio-card">
            <p>{profile.bio}</p>

            <ul className="about-meta">
              {profile.email && (
                <li>
                  <span className="badge">البريد</span> {profile.email}
                </li>
              )}
              {profile.location && (
                <li>
                  <span className="badge">الموقع</span> {profile.location}
                </li>
              )}
            </ul>
          </RevealItem>

          <motion.div className="about-stats" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </RevealGroup>
      </div>
    </section>
  );
}

export default About;
