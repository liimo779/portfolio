require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { Pool } = require('pg');
const express = require("express");
const cors = require("cors");
const path = require("path");

const portfolioRoutes = require("./routes/portfolioRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()')
  .then(result => {
    console.log('✅ Database connected:', result.rows[0]);
  })
  .catch(err => {
    console.error('❌ DATABASE CONNECTION ERROR:');
    console.error(err);
  });

const dbUrl = new URL(process.env.DATABASE_URL);

console.log("DB hostname:", dbUrl.hostname);
console.log("DB port:", dbUrl.port);
console.log("DB database:", dbUrl.pathname);

console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

app.use("/api", portfolioRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
  

