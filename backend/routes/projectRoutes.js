const express = require("express");

const { createProject, getProjects } = require("../controllers/projectController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, adminOnly, createProject);
router.get("/all", authMiddleware, getProjects);

module.exports = router;