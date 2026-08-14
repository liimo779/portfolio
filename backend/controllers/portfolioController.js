const db = require("../utils/db");

// =========================
// Profile
// =========================

const getProfile = async (req, res) => {
  try {
    const row = await db.query(
      `SELECT * FROM profile LIMIT 1`
    );

    res.json(row.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// Skills
// =========================

const getSkills = async (req, res) => {
  try {
    const rows = await db.query(
      `SELECT * FROM skills`
    );

    res.json(rows.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// Projects
// =========================

const getProjects = async (req, res) => {
  try {
    const rows = await db.query(
      `SELECT * FROM projects ORDER BY sort_order ASC, id ASC`
    );

    res.json(rows.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// Experience
// =========================

const getExperience = async (req, res) => {
  try {
    const rows = await db.query(
      `SELECT * FROM experience ORDER BY sort_order ASC, id ASC`
    );

    res.json(rows.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// Education
// =========================

const getEducation = async (req, res) => {
  try {
    const rows = await db.query(
      `SELECT * FROM education ORDER BY sort_order ASC, id ASC`
    );

    res.json(rows.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// Messages
// =========================

const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "الاسم والبريد الإلكتروني والرسالة كلها مطلوبة",
    });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [name, email, message]
    );

    res.status(201).json({
      id: result.rows[0].id,
      name,
      email,
      message,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// Export
// =========================

module.exports = {
  getProfile,
  getSkills,
  getProjects,
  getExperience,
  getEducation,
  createMessage,
};