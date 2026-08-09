const express = require("express");

const { getProfile,   getSkills} = require("../controllers/portfolioController");

const router = express.Router();


router.get("/profile", getProfile);

router.get("/skills", getSkills);


module.exports = router;