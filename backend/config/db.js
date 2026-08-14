const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// الاتصال بقاعدة البيانات SQLite عبر ملف app.db المحلي
const db = new sqlite3.Database(path.join(__dirname, '../app.db'));

const isSelect = (text) => /^\s*SELECT/i.test(text);
const hasReturning = (text) => /\bRETURNING\b/i.test(text);

const query = (text, params = []) => {
  return new Promise((resolve, reject) => {
    if (isSelect(text) || hasReturning(text)) {
      db.all(text, params, (err, rows) => {
        if (err) return reject(err);
        resolve({ rows, rowCount: rows.length });
      });
    } else {
      db.run(text, params, function (err) {
        if (err) return reject(err);
        resolve({ rows: [], rowCount: this.changes, lastID: this.lastID });
      });
    }
  });
};

module.exports = {
  query,
};