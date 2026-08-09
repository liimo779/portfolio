const express = require("express");
const cors = require("cors");

const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", portfolioRoutes);

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
  

