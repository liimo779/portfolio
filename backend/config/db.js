const { Pool } = require('pg');

// الاتصال بقاعدة البيانات PostgreSQL باستخدام رابط الاتصال
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};