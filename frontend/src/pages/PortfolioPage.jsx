import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../api";

import Navbar from "../Components/Navbar.jsx";
import ScrollProgress from "../Components/ScrollProgress.jsx";
import CursorGlow from "../Components/CursorGlow.jsx";
import Hero from "../Components/Hero.jsx";
import About from "../Components/About.jsx";
import Skills from "../Components/Skills.jsx";
import Projects from "../Components/Projects.jsx";
import Experience from "../Components/Experience.jsx";
import Education from "../Components/Education.jsx";
import Contact from "../Components/Contact.jsx";
import Footer from "../Components/Footer.jsx";

import "../App.css";

const fadePage = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: "easeIn" } },
};

function PortfolioPage() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/profile"),
      api.get("/skills"),
      api.get("/projects"),
      api.get("/experience"),
      api.get("/education"),
    ])
      .then(([profileRes, skillsRes, projectsRes, experienceRes, educationRes]) => {
        setProfile(profileRes.data);
        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
        setExperience(experienceRes.data);
        setEducation(educationRes.data);
      })
      .catch((error) => {
        console.error("خطأ في جلب البيانات:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loading"
          className="status-screen"
          variants={fadePage}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="spinner" />
          <p>جاري تحميل البيانات ...</p>
        </motion.div>
      )}

      {!loading && !profile && (
        <motion.div
          key="error"
          className="status-screen error"
          variants={fadePage}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h2>تعذر الاتصال بالخادم</h2>
          <p>تأكد أن السيرفر الخلفي شغال على المنفذ 5001 ثم أعد تحميل الصفحة.</p>
        </motion.div>
      )}

      {!loading && profile && (
        <motion.div
          key="content"
          className="app-container"
          variants={fadePage}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <CursorGlow />
          <ScrollProgress />
          <Navbar name={profile.name} />
          <Hero profile={profile} />
          <About profile={profile} skills={skills} projects={projects} experience={experience} />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Education education={education} />
          <Contact profile={profile} />
          <Footer profile={profile} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PortfolioPage;
