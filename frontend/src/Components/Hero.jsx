import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../motion";
import { smoothScrollTo } from "../smoothScroll";
import "./Hero.css";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function Hero({ profile }) {
  const { name, title, bio, location, github_url, linkedin_url } = profile;

  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />

      <motion.div
        className="container hero-inner"
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <motion.div
            className="hero-avatar"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <span>{getInitials(name)}</span>
          </motion.div>
        </motion.div>

        <motion.p className="hero-eyebrow" variants={fadeUp}>
          مرحباً، اسمي
        </motion.p>
        <motion.h1 className="hero-name" variants={fadeUp}>
          {name}
        </motion.h1>
        {title && (
          <motion.h2 className="hero-title" variants={fadeUp}>
            {title}
          </motion.h2>
        )}
        {bio && (
          <motion.p className="hero-bio" variants={fadeUp}>
            {bio}
          </motion.p>
        )}

        {location && (
          <motion.p className="hero-location" variants={fadeUp}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {location}
          </motion.p>
        )}

        <motion.div className="hero-actions" variants={fadeUp}>
          <motion.a
            href="#contact"
            className="btn btn-primary"
            onClick={(event) => {
              event.preventDefault();
              smoothScrollTo("contact");
            }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            تواصل معي
          </motion.a>
          {github_url && (
            <motion.a
              href={github_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              GitHub
            </motion.a>
          )}
          {linkedin_url && (
            <motion.a
              href={linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              LinkedIn
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
