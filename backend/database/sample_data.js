const db = require("../config/db");

// دالة مساعدة لتحويل db.run إلى Promise
const runQuery = (db, sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const profile = {
  name: "Lamar",
  title: "Full-Stack Web Developer",
  bio: "مطور ويب متكامل (Full-Stack) شغوف ببناء تطبيقات ويب نظيفة وسريعة، بخبرة عملية في React وNode.js وقواعد البيانات العلائقية. أهتم بكتابة كود قابل للصيانة وحل المشاكل بطريقة عملية.",
  email: "lamar.dev@example.com",
  phone: "+966 50 000 0000",
  location: "الرياض، السعودية",
  github_url: "https://github.com/liimo779",
  linkedin_url: "https://linkedin.com/in/lamar-dev",
  resume_url: ""
};

// قائمة المهارات للـ CV
const skillsList = [
  // Web Development & Backend
  { name: "JavaScript", category: "Web Development", level: 85 },
  { name: "Node.js", category: "Backend Development", level: 80 },
  { name: "Express.js", category: "Backend Development", level: 80 },
  { name: "React.js", category: "Frontend Development", level: 75 },
  { name: "HTML5 & CSS3", category: "Frontend Development", level: 90 },
  { name: "RESTful APIs", category: "Backend Development", level: 85 },

  // Database & Data Analysis
  { name: "SQL & Relational Databases", category: "Database", level: 85 },
  { name: "SQLite", category: "Database", level: 85 },
  { name: "Data Analysis", category: "Data Science", level: 75 },

  // Tools & Methodologies
  { name: "Git & GitHub", category: "Developer Tools", level: 80 },
  { name: "Postman", category: "Developer Tools", level: 80 },
  { name: "VS Code", category: "Developer Tools", level: 90 },

  // Soft Skills
  { name: "Problem Solving", category: "Soft Skills", level: 90 },
  { name: "Teamwork & Collaboration", category: "Soft Skills", level: 85 },
  { name: "Time Management", category: "Soft Skills", level: 85 }
];

// مشاريع نموذجية للعرض في البورتفوليو
const projectsList = [
  {
    title: "منصة إدارة المهام",
    description: "تطبيق ويب لإدارة المهام والمشاريع الجماعية، يدعم إنشاء لوحات، تعيين مهام لأعضاء الفريق، وتتبع الحالة في الوقت الفعلي.",
    tech_stack: "React, Node.js, Express, SQLite",
    github_url: "https://github.com/liimo779/task-manager",
    live_url: "",
    featured: 1,
    sort_order: 1
  },
  {
    title: "متجر إلكتروني - API",
    description: "واجهة برمجية (REST API) متكاملة لمتجر إلكتروني تشمل إدارة المنتجات، السلة، الطلبات، والمصادقة عبر JWT.",
    tech_stack: "Node.js, Express, SQLite, JWT",
    github_url: "https://github.com/liimo779/ecommerce-api",
    live_url: "",
    featured: 1,
    sort_order: 2
  },
  {
    title: "لوحة تحكم لعرض بيانات الطقس",
    description: "لوحة تحكم تفاعلية تعرض بيانات الطقس المباشرة لأكثر من مدينة، مع رسوم بيانية لتوقعات درجات الحرارة.",
    tech_stack: "React, Chart.js, REST API",
    github_url: "https://github.com/liimo779/weather-dashboard",
    live_url: "",
    featured: 0,
    sort_order: 3
  },
  {
    title: "هذا البورتفوليو",
    description: "موقع البورتفوليو الشخصي هذا، مبني بمعمارية Full-Stack مع لوحة بيانات ديناميكية بدل المحتوى الثابت.",
    tech_stack: "React, Vite, Node.js, Express, SQLite",
    github_url: "https://github.com/liimo779/portfolio",
    live_url: "",
    featured: 1,
    sort_order: 4
  }
];

// الخبرات العملية
const experienceList = [
  {
    company: "شركة تقنية مستقلة (عمل حر)",
    role: "مطور ويب Full-Stack",
    description: "تصميم وتطوير تطبيقات ويب متكاملة لعملاء متنوعين، بدءًا من واجهات المستخدم وصولًا إلى الواجهات البرمجية وقواعد البيانات.",
    location: "عن بُعد",
    start_date: "2024-01",
    end_date: null,
    sort_order: 1
  },
  {
    company: "مشروع تدريبي / بوت كامب",
    role: "مطور ويب متدرب",
    description: "بناء مشاريع عملية باستخدام JavaScript وReact وNode.js ضمن برنامج تدريبي مكثف في تطوير الويب.",
    location: "الرياض، السعودية",
    start_date: "2023-06",
    end_date: "2023-12",
    sort_order: 2
  }
];

// المؤهلات الدراسية
const educationList = [
  {
    institution: "جامعة (اسم الجهة التعليمية)",
    degree: "بكالوريوس",
    field: "علوم الحاسب / تقنية المعلومات",
    start_date: "2020-09",
    end_date: "2024-06",
    sort_order: 1
  }
];

const insertMany = async (table, columns, rows) => {
  const placeholders = columns.map(() => "?").join(", ");
  for (const row of rows) {
    await runQuery(
      db,
      `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`,
      columns.map((col) => row[col])
    );
  }
};

// الجداول اللي تُعبّى ببيانات نموذجية (باستثناء messages، لأنها رسائل حقيقية من زوار الموقع)
const seededTables = ["profile", "skills", "projects", "experience", "education"];

const clearSampleTables = async () => {
  for (const table of seededTables) {
    await runQuery(db, `DELETE FROM ${table}`);
    await runQuery(db, `DELETE FROM sqlite_sequence WHERE name = ?`, [table]);
  }
};

const insertSampleData = async () => {
  try {
    console.log("جاري حذف البيانات الحالية...");
    await clearSampleTables();

    console.log("جاري إدخال بيانات البروفايل...");
    await runQuery(
      db,
      `INSERT INTO profile (name, title, bio, email, phone, location, github_url, linkedin_url, resume_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profile.name,
        profile.title,
        profile.bio,
        profile.email,
        profile.phone,
        profile.location,
        profile.github_url,
        profile.linkedin_url,
        profile.resume_url
      ]
    );

    console.log("جاري إدخال المهارات...");
    await insertMany("skills", ["name", "category", "level"], skillsList);

    console.log("جاري إدخال المشاريع...");
    await insertMany(
      "projects",
      ["title", "description", "tech_stack", "github_url", "live_url", "featured", "sort_order"],
      projectsList
    );

    console.log("جاري إدخال الخبرات العملية...");
    await insertMany(
      "experience",
      ["company", "role", "description", "location", "start_date", "end_date", "sort_order"],
      experienceList
    );

    console.log("جاري إدخال المؤهلات الدراسية...");
    await insertMany(
      "education",
      ["institution", "degree", "field", "start_date", "end_date", "sort_order"],
      educationList
    );

    console.log("تم إدخال جميع البيانات بنجاح!");
  } catch (error) {
    console.error("حدث خطأ أثناء إدخال البيانات:", error.message);
  } finally {
    db.close();
  }
};

insertSampleData();
