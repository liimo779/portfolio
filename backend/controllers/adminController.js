const db = require("../utils/db");

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
      "demo_url", // تم التعديل إلى demo_url ليطابق الفرونت إند والـ Schema
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
// Create Resource (مُعدلة مع تحويل القيم الضمنية)
// =========================

const createResource = async (req, res) => {
  const config = getResourceConfig(req.params.resource);

  if (!config) {
    return res.status(404).json({
      error: "مورد غير معروف",
    });
  }

  // تجهيز القيم مع معالجة حقول demo_url و featured و sort_order
  const values = config.columns.map((col) => {
    let val = req.body[col];
    
    // دعم مسمى live_url أو demo_url تبادلياً
    if (col === "demo_url" && val === undefined) {
      val = req.body["live_url"] ?? null;
    }

    // تحويل قيمة featured البولينية إلى رقم إذا كان العمود INTEGER
    if (col === "featured") {
      val = val === true || val === 1 || val === "true" ? 1 : 0;
    }

    // تعيين قيمة افتراضية للـ sort_order
    if (col === "sort_order") {
      val = Number(val) || 0;
    }

    return val ?? null;
  });

  const placeholders = config.columns
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  try {
    const result = await db.query(
      `
      INSERT INTO ${config.table}
      (${config.columns.join(", ")})
      VALUES (${placeholders})
      RETURNING id
      `,
      values
    );

    const created = await db.query(
      `SELECT * FROM ${config.table} WHERE id = $1`,
      [result.rows[0].id]
    );

    res.status(201).json(created.rows[0]);
  } catch (error) {
    console.error("Create Resource Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};