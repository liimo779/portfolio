require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { Pool } = require('pg');
const express = require("express");
const cors = require("cors");
const path = require("path");

const portfolioRoutes = require("./routes/portfolioRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query('SELECT NOW()')
  .then(result => {
    console.log('✅ Database connected:', result.rows[0]);
  })
  .catch(err => {
    console.error('❌ DATABASE CONNECTION ERROR:');
    console.error(err);
  });

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
  

