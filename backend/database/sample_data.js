const db = require("../config/db");

// =========================
// Profile
// =========================

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

// =========================
// Skills
// =========================

const skillsList = [
  { name: "JavaScript", category: "Web Development", level: 85 },
  { name: "Node.js", category: "Backend Development", level: 80 },
  { name: "Express.js", category: "Backend Development", level: 80 },
  { name: "React.js", category: "Frontend Development", level: 75 },
  { name: "HTML5 & CSS3", category: "Frontend Development", level: 90 },
  { name: "RESTful APIs", category: "Backend Development", level: 85 },

  { name: "SQL & Relational Databases", category: "Database", level: 85 },
  { name: "PostgreSQL", category: "Database", level: 80 },
  { name: "Data Analysis", category: "Data Science", level: 75 },

  { name: "Git & GitHub", category: "Developer Tools", level: 80 },
  { name: "Postman", category: "Developer Tools", level: 80 },
  { name: "VS Code", category: "Developer Tools", level: 90 },

  { name: "Problem Solving", category: "Soft Skills", level: 90 },
  { name: "Teamwork & Collaboration", category: "Soft Skills", level: 85 },
  { name: "Time Management", category: "Soft Skills", level: 85 }
];

// =========================
// Projects
// =========================

const projectsList = [
  {
    title: "منصة إدارة المهام",
    description:
      "تطبيق ويب لإدارة المهام والمشاريع الجماعية، يدعم إنشاء لوحات، تعيين مهام لأعضاء الفريق، وتتبع الحالة في الوقت الفعلي.",
    tech_stack: "React, Node.js, Express, PostgreSQL",
    github_url: "https://github.com/liimo779/task-manager",
    live_url: "",
    featured: 1,
    sort_order: 1
  },
  {
    title: "متجر إلكتروني - API",
    description:
      "واجهة برمجية (REST API) متكاملة لمتجر إلكتروني تشمل إدارة المنتجات، السلة، الطلبات، والمصادقة عبر JWT.",
    tech_stack: "Node.js, Express, PostgreSQL, JWT",
    github_url: "https://github.com/liimo779/ecommerce-api",
    live_url: "",
    featured: 1,
    sort_order: 2
  },
  {
    title: "لوحة تحكم لعرض بيانات الطقس",
    description:
      "لوحة تحكم تفاعلية تعرض بيانات الطقس المباشرة لأكثر من مدينة، مع رسوم بيانية لتوقعات درجات الحرارة.",
    tech_stack: "React, Chart.js, REST API",
    github_url: "https://github.com/liimo779/weather-dashboard",
    live_url: "",
    featured: 0,
    sort_order: 3
  },
  {
    title: "هذا البورتفوليو",
    description:
      "موقع البورتفوليو الشخصي هذا، مبني بمعمارية Full-Stack مع لوحة بيانات ديناميكية بدل المحتوى الثابت.",
    tech_stack: "React, Vite, Node.js, Express, PostgreSQL",
    github_url: "https://github.com/liimo779/portfolio",
    live_url: "",
    featured: 1,
    sort_order: 4
  }
];

// =========================
// Student Experience
// =========================

const experienceList = [
  {
    title: "هاكثون برمجي",
    type: "Hackathon",
    description: "المشاركة في تطوير مشروع تقني والعمل ضمن فريق لحل مشكلة واقعية.",
    date: "2026",
    sort_order: 1
  },
  {
    title: "مسابقة برمجة",
    type: "Competition",
    description: "المشاركة في مسابقة برمجية وتطبيق مهارات حل المشكلات والبرمجة.",
    date: "2026",
    sort_order: 2
  }
];

// =========================
// Education
// =========================

const educationList = [
  {
    institution: "جامعة (اسم الجهة التعليمية)",
    degree: "بكالوريوس",
    field: "نظم المعلومات",
    start_date: "2020-09",
    end_date: "2024-06",
    sort_order: 1
  }
];

// =========================
// Insert Many
// =========================

const insertMany = async (table, columns, rows) => {
  for (const row of rows) {
    const values = columns.map((column) => row[column]);

    const placeholders = columns
      .map((_, index) => `$${index + 1}`)
      .join(", ");

    await db.query(
      `
      INSERT INTO ${table} (${columns.join(", ")})
      VALUES (${placeholders})
      `,
      values
    );
  }
};

// =========================
// Insert Sample Data
// =========================

const insertSampleData = async () => {
  try {
    console.log("جاري إدخال بيانات البروفايل...");

    await db.query(`
      DELETE FROM profile
    `);

    await db.query(
      `
      INSERT INTO profile
      (
        name,
        title,
        bio,
        email,
        phone,
        location,
        github_url,
        linkedin_url,
        resume_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
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

    await db.query(`DELETE FROM skills`);
    await insertMany(
      "skills",
      ["name", "category", "level"],
      skillsList
    );

    console.log("جاري إدخال المشاريع...");

    await db.query(`DELETE FROM projects`);
    await insertMany(
      "projects",
      [
        "title",
        "description",
        "tech_stack",
        "github_url",
        "live_url",
        "featured",
        "sort_order"
      ],
      projectsList
    );

    console.log("جاري إدخال الخبرات...");

    await db.query(`DELETE FROM experience`);
    await insertMany(
      "experience",
      [
        "title",
        "type",
        "description",
        "date",
        "sort_order"
      ],
      experienceList
    );

    console.log("جاري إدخال المؤهلات الدراسية...");

    await db.query(`DELETE FROM education`);
    await insertMany(
      "education",
      [
        "institution",
        "degree",
        "field",
        "start_date",
        "end_date",
        "sort_order"
      ],
      educationList
    );

    console.log("تم إدخال جميع البيانات بنجاح!");
  } catch (error) {
    console.error(
      "حدث خطأ أثناء إدخال البيانات:",
      error.message
    );
  }
};

insertSampleData();