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

const tables = ["profile", "skills", "projects", "experience", "education", "messages"];

const createTables = async () => {
  try {
    // إعادة الجداول من الصفر لضمان مطابقتها لآخر تعريف للسكيمة
    for (const table of tables) {
      await runQuery(db, `DROP TABLE IF EXISTS ${table}`);
    }

    // بيانات الملف الشخصي / التعريف بصاحب البورتفوليو
    await runQuery(db, `CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT,
      bio TEXT,
      email TEXT,
      phone TEXT,
      location TEXT,
      github_url TEXT,
      linkedin_url TEXT,
      resume_url TEXT
    )`);

    // المهارات التقنية
    await runQuery(db, `CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      level INTEGER
    )`);

    // المشاريع
    await runQuery(db, `CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      tech_stack TEXT,
      github_url TEXT,
      live_url TEXT,
      featured INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0
    )`);

    // الخبرات العملية
    await runQuery(db, `CREATE TABLE IF NOT EXISTS experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      description TEXT,
      location TEXT,
      start_date TEXT,
      end_date TEXT,
      sort_order INTEGER DEFAULT 0
    )`);

    // المؤهلات الدراسية
    await runQuery(db, `CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution TEXT NOT NULL,
      degree TEXT,
      field TEXT,
      start_date TEXT,
      end_date TEXT,
      sort_order INTEGER DEFAULT 0
    )`);

    // رسائل نموذج التواصل
    await runQuery(db, `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log("تم إنشاء الجداول بنجاح!");
  } catch (error) {
    console.error("حدث خطأ أثناء إنشاء الجداول:", error.message);
  } finally {
    db.close();
  }
};

createTables();
