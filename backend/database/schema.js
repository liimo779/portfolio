const db = require("../config/db");

const createTables = async () => {
  try {
    // =========================
    // Profile
    // =========================
    await db.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
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
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        level INTEGER
      )
    `);

    // =========================
    // Projects
    // =========================
    await db.query(`DROP TABLE IF EXISTS projects CASCADE;`);
    await db.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
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
    await db.query(`DROP TABLE IF EXISTS experience CASCADE;`);
    await db.query(`
       CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    title TEXT,
    company TEXT,
    role TEXT,
    description TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    sort_order INTEGER DEFAULT 0
  `);

    // =========================
    // Education
    // =========================
    await db.query(`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
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
        id SERIAL PRIMARY KEY,
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