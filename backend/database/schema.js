const db = require("../config/db");

const createTables = async () => {
  try {
    // =========================
    // Profile
    // =========================
    await db.query(`
      CREATE TABLE IF NOT EXISTS profile (
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
      )
    `);

    // =========================
    // Skills
    // =========================
    await db.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        level INTEGER
      )
    `);

    // =========================
    // Projects
    // =========================
    await db.query(`DROP TABLE IF EXISTS projects;`);
    await db.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        tech_stack TEXT,
        github_url TEXT,
        demo_url TEXT,
        featured INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0
      )
    `);

    // =========================
    // Experience / Student Activities
    // =========================
    await db.query(`DROP TABLE IF EXISTS experience;`);
    await db.query(`
       CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    type TEXT,
    description TEXT,
    date TEXT,
    sort_order INTEGER DEFAULT 0
    );
  `);

    // =========================
    // Education
    // =========================
    await db.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        institution TEXT NOT NULL,
        degree TEXT,
        field TEXT,
        start_date TEXT,
        end_date TEXT,
        sort_order INTEGER DEFAULT 0
      )
    `);

    // =========================
    // Messages
    // =========================
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("All PostgreSQL tables created successfully!");
  } catch (error) {
    console.error("Error creating PostgreSQL tables:", error);
  }
};

createTables();