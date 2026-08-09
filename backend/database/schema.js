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

const initDatabase = async () => {

  try {
    // 1. حذف الجدول وإعادة إنشائه
    await runQuery(db, `DROP TABLE IF EXISTS profile`);
    
    await runQuery(db, `CREATE TABLE IF NOT EXISTS profile (
      name TEXT NOT NULL,
      my_id INTEGER NOT NULL,
      description TEXT,
      github_url TEXT
    )`);

    await runQuery(db, `CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      level INTEGER
    )`);

    // 2. إدخال البيانات في جدول profile
    await runQuery(
      db,
      `INSERT INTO profile (name, my_id, description, github_url) VALUES (?, ?, ?, ?)`,
      ["Lamar", 2507241, "is", "https://github.com/liimo779S"]
    );

    console.log("تم إنشاء الجداول وإدخال البيانات بنجاح!");

  } catch (error) {
    // أي خطأ يحدث في SQL سيتم التقاطه هنا
    console.error("حدث خطأ أثناء التعامل مع قاعدة البيانات:", error.message);
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    db.close();
  }
};

const insertSkills = async () => {

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

  try {
    console.log("جاري إدخال المهارات...");

    for (const skill of skillsList) {
      await runQuery(
        db,
        `INSERT INTO skills (name, category, level) VALUES (?, ?, ?)`,
        [skill.name, skill.category, skill.level]
      );
    }

    console.log("تمت إضافة جميع المهارات بنجاح!");

  } catch (error) {
    console.error("حدث خطأ أثناء إدخال المهارات:", error.message);
  } finally {
    db.close();
  }
};

 
initDatabase();
insertSkills();

 