const db = require("../utils/db");

// =========================
// Profile
// =========================

const getProfile = async (req, res) => {
  try {
    const row = await db.get(
      `SELECT * FROM profile LIMIT 1`
    );

    res.json(row);
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
    const rows = await db.all(
      `SELECT * FROM skills`
    );

    res.json(rows);
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
    const rows = await db.all(
      `SELECT * FROM projects ORDER BY sort_order ASC, id ASC`
    );

    res.json(rows);
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
    const rows = await db.all(
      `SELECT * FROM experience ORDER BY sort_order ASC, id ASC`
    );

    res.json(rows);
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
    const rows = await db.all(
      `SELECT * FROM education ORDER BY sort_order ASC, id ASC`
    );

    res.json(rows);
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
    const result = await db.run(
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