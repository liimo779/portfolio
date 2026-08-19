const express = require("express");

const requireAuth = require("../middleware/auth");
const { login } = require("../controllers/authController");
const {
  listResource,
  createResource,
  updateResource,
  deleteResource,
  getProfileAdmin,
  updateProfileAdmin,
  listMessages,
  deleteMessage,
  exportDatabase,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", login);

router.use(requireAuth);

router.get("/profile", getProfileAdmin);
router.put("/profile", updateProfileAdmin);

router.get("/messages", listMessages);
router.delete("/messages/:id", deleteMessage);

router.get("/export", exportDatabase);

router.get("/resources/:resource", listResource);
router.post("/resources/:resource", createResource);
router.put("/resources/:resource/:id", updateResource);
router.delete("/resources/:resource/:id", deleteResource);

module.exports = router;
