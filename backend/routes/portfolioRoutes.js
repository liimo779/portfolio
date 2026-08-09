const express = require("express");

const {
    getProfile,
    getSkills,
    getProjects,
    getExperience,
    getEducation,
    createMessage
} = require("../controllers/portfolioController");

const router = express.Router();


router.get("/profile", getProfile);

router.get("/skills", getSkills);

router.get("/projects", getProjects);

router.get("/experience", getExperience);

router.get("/education", getEducation);

router.post("/messages", createMessage);


module.exports = router;
