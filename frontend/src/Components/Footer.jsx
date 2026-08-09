import { motion } from "framer-motion";
import { fadeIn, viewportOnce } from "../motion";
import "./Footer.css";

function Footer({ profile }) {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="container footer-inner">
        <p>© {year} {profile.name}. جميع الحقوق محفوظة.</p>

        <div className="footer-links">
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
