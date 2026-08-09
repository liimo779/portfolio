
const path = require("path");
const { Database } = require("sqlite3");

const dbPath = path.join(__dirname, "../app.db");

const db = new Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite");
    }
});

module.exports = db;