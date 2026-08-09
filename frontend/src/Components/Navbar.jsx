import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { smoothScrollTo } from "../smoothScroll";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "الرئيسية" },
  { id: "about", label: "نبذة" },
  { id: "skills", label: "المهارات" },
  { id: "projects", label: "المشاريع" },
  { id: "experience", label: "الخبرة" },
  { id: "education", label: "التعليم" },
  { id: "contact", label: "تواصل" },
];

function Navbar({ name }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (event, id) => {
    event.preventDefault();
    setOpen(false);
    smoothScrollTo(id);
  };

  return (
    <motion.header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar-inner">
        <a href="#home" className="navbar-brand" onClick={(event) => handleLinkClick(event, "home")}>
          <span className="navbar-brand-dot" />
          {name || "Portfolio"}
        </a>

        <nav
          className={`navbar-links ${open ? "navbar-links-open" : ""}`}
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => handleLinkClick(event, link.id)}
              onMouseEnter={() => setHovered(link.id)}
            >
              {link.label}
              {hovered === link.id && (
                <motion.span
                  layoutId="navbar-underline"
                  className="navbar-underline"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </a>
          ))}
        </nav>

        <button
          className={`navbar-toggle ${open ? "navbar-toggle-open" : ""}`}
          aria-label="فتح القائمة"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.header>
  );
}

export default Navbar;
