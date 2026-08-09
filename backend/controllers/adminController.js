const { run, get, all } = require("../utils/db");

// تعريف الموارد القابلة لإدارتها عبر نفس الأكواد العامة (Skills / Projects / Experience / Education)
const RESOURCES = {
  skills: {
    table: "skills",
    columns: ["name", "category", "level"],
    orderBy: "id ASC",
  },
  projects: {
    table: "projects",
    columns: ["title", "description", "tech_stack", "github_url", "live_url", "featured", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
  experience: {
    table: "experience",
    columns: ["company", "role", "description", "location", "start_date", "end_date", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
  education: {
    table: "education",
    columns: ["institution", "degree", "field", "start_date", "end_date", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
};

const getResourceConfig = (resource) => RESOURCES[resource];

const listResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);
  if (!config) return res.status(404).json({ error: "مورد غير معروف" });

  try {
    const rows = await all(`SELECT * FROM ${config.table} ORDER BY ${config.orderBy}`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);
  if (!config) return res.status(404).json({ error: "مورد غير معروف" });

  const values = config.columns.map((col) => req.body[col] ?? null);
  const placeholders = config.columns.map(() => "?").join(", ");

  try {
    const result = await run(
      `INSERT INTO ${config.table} (${config.columns.join(", ")}) VALUES (${placeholders})`,
      values
    );
    const created = await get(`SELECT * FROM ${config.table} WHERE id = ?`, [result.lastID]);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);
  if (!config) return res.status(404).json({ error: "مورد غير معروف" });

  const setClause = config.columns.map((col) => `${col} = ?`).join(", ");
  const values = config.columns.map((col) => req.body[col] ?? null);

  try {
    await run(`UPDATE ${config.table} SET ${setClause} WHERE id = ?`, [...values, req.params.id]);
    const updated = await get(`SELECT * FROM ${config.table} WHERE id = ?`, [req.params.id]);
    if (!updated) return res.status(404).json({ error: "العنصر غير موجود" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);
  if (!config) return res.status(404).json({ error: "مورد غير معروف" });

  try {
    await run(`DELETE FROM ${config.table} WHERE id = ?`, [req.params.id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// الملف الشخصي: صف واحد فقط، تعديل بدل إنشاء/حذف
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
    const row = await get(`SELECT * FROM profile LIMIT 1`);
    res.json(row || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfileAdmin = async (req, res) => {
  const values = PROFILE_COLUMNS.map((col) => req.body[col] ?? null);

  try {
    const existing = await get(`SELECT id FROM profile LIMIT 1`);

    if (existing) {
      const setClause = PROFILE_COLUMNS.map((col) => `${col} = ?`).join(", ");
      await run(`UPDATE profile SET ${setClause} WHERE id = ?`, [...values, existing.id]);
    } else {
      const placeholders = PROFILE_COLUMNS.map(() => "?").join(", ");
      await run(`INSERT INTO profile (${PROFILE_COLUMNS.join(", ")}) VALUES (${placeholders})`, values);
    }

    const updated = await get(`SELECT * FROM profile LIMIT 1`);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// رسائل التواصل: عرض وحذف فقط (المصدر هو نموذج التواصل بالموقع)
const listMessages = async (req, res) => {
  try {
    const rows = await all(`SELECT * FROM messages ORDER BY created_at DESC`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await run(`DELETE FROM messages WHERE id = ?`, [req.params.id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
