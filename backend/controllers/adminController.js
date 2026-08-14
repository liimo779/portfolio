const { run, get, all } = require("../utils/db");

// الموارد القابلة للإدارة
const RESOURCES = {
  skills: {
    table: "skills",
    columns: ["name", "category", "level"],
    orderBy: "id ASC",
  },

  projects: {
    table: "projects",
    columns: [
      "title",
      "description",
      "tech_stack",
      "github_url",
      "live_url",
      "featured",
      "sort_order",
    ],
    orderBy: "sort_order ASC, id ASC",
  },

  experience: {
    table: "experience",
    columns: [
      "title",
      "type",
      "description",
      "date",
      "sort_order",
    ],
    orderBy: "sort_order ASC, id ASC",
  },

  education: {
    table: "education",
    columns: [
      "institution",
      "degree",
      "field",
      "start_date",
      "end_date",
      "sort_order",
    ],
    orderBy: "sort_order ASC, id ASC",
  },
};

const getResourceConfig = (resource) => RESOURCES[resource];

// =========================
// List Resource
// =========================

const listResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);

  if (!config) {
    return res.status(404).json({
      error: "مورد غير معروف",
    });
  }

  try {
    const rows = await all(
      `SELECT * FROM ${config.table} ORDER BY ${config.orderBy}`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// Create Resource
// =========================

const createResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);

  if (!config) {
    return res.status(404).json({
      error: "مورد غير معروف",
    });
  }

  const values = config.columns.map(
    (col) => req.body[col] ?? null
  );

  const placeholders = config.columns
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  try {
    const result = await run(
      `
      INSERT INTO ${config.table}
      (${config.columns.join(", ")})
      VALUES (${placeholders})
      RETURNING id
      `,
      values
    );

    const created = await get(
      `SELECT * FROM ${config.table} WHERE id = $1`,
      [result.rows[0].id]
    );

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// Update Resource
// =========================

const updateResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);

  if (!config) {
    return res.status(404).json({
      error: "مورد غير معروف",
    });
  }

  const setClause = config.columns
    .map((col, index) => `${col} = $${index + 1}`)
    .join(", ");

  const values = config.columns.map(
    (col) => req.body[col] ?? null
  );

  try {
    const result = await run(
      `
      UPDATE ${config.table}
      SET ${setClause}
      WHERE id = $${config.columns.length + 1}
      `,
      [...values, req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "العنصر غير موجود",
      });
    }

    const updated = await get(
      `SELECT * FROM ${config.table} WHERE id = $1`,
      [req.params.id]
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// Delete Resource
// =========================

const deleteResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);

  if (!config) {
    return res.status(404).json({
      error: "مورد غير معروف",
    });
  }

  try {
    const result = await run(
      `DELETE FROM ${config.table} WHERE id = $1`,
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "العنصر غير موجود",
      });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// Profile
// =========================

const PROFILE_COLUMNS = [
  "name",
  "title",
  "bio",
  "email",
  "phone",
  "location",
  "github_url",
  "linkedin_url",
  "resume_url",
];

const getProfileAdmin = async (req, res) => {
  try {
    const row = await get(
      `SELECT * FROM profile LIMIT 1`
    );

    res.json(row || null);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateProfileAdmin = async (req, res) => {
  const values = PROFILE_COLUMNS.map(
    (col) => req.body[col] ?? null
  );

  try {
    const existing = await get(
      `SELECT id FROM profile LIMIT 1`
    );

    if (existing) {
      const setClause = PROFILE_COLUMNS
        .map((col, index) => `${col} = $${index + 1}`)
        .join(", ");

      await run(
        `
        UPDATE profile
        SET ${setClause}
        WHERE id = $${PROFILE_COLUMNS.length + 1}
        `,
        [...values, existing.id]
      );
    } else {
      const placeholders = PROFILE_COLUMNS
        .map((_, index) => `$${index + 1}`)
        .join(", ");

      await run(
        `
        INSERT INTO profile (${PROFILE_COLUMNS.join(", ")})
        VALUES (${placeholders})
        RETURNING id
        `,
        values
      );
    }

    const updated = await get(
      `SELECT * FROM profile LIMIT 1`
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// Messages
// =========================

const listMessages = async (req, res) => {
  try {
    const rows = await all(
      `SELECT * FROM messages ORDER BY created_at DESC`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const result = await run(
      `DELETE FROM messages WHERE id = $1`,
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "الرسالة غير موجودة",
      });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// Export
// =========================

module.exports = {
  listResource,
  createResource,
  updateResource,
  deleteResource,
  getProfileAdmin,
  updateProfileAdmin,
  listMessages,
  deleteMessage,
};