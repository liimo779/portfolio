 import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Components/Header.jsx";
import Skills from "./Components/Skills.jsx";

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5001/api/profile"),
      axios.get("http://localhost:5001/api/skills"),
    ])
      .then(([profileResponse, skillsResponse]) => {
        console.log("Profile:", profileResponse.data);
        console.log("Skills:", skillsResponse.data);

        setData(profileResponse.data);
        setSkills(skillsResponse.data);
      })
      .catch((error) => {
        console.error("خطأ في جلب البيانات:", error);
      })
      .finally(() => {
        console.log("Finished loading");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="status-message">
        جاري تحميل البيانات ...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="status-message error">
        تعذر الاتصال بالباك اند، تأكد أن السيرفر شغال
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header
        name={data.name}
        bio={data.description}
      />

      <Skills skills={skills} />
    </div>
  );
}

export default App;