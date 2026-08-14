const db = require("../config/db");

const convertPlaceholders = (sql) => {
  let index = 0;
  return sql.replace(/\?/g, () => {
    index++;
    return `$${index}`;
  });
};

const run = async (sql, params = []) => {
  const query = convertPlaceholders(sql);
  const result = await db.query(query, params);
  return result; // يرجع كائن نتيجة pg بالكامل (يشمل rows و rowCount)
};

const get = async (sql, params = []) => {
  const query = convertPlaceholders(sql);
  const result = await db.query(query, params);
  return result.rows[0];
};

const all = async (sql, params = []) => {
  const query = convertPlaceholders(sql);
  const result = await db.query(query, params);
  return result.rows;
};

module.exports = {
  run,
  get,
  all,
};