const express = require("express");
const { getUsers } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", authMiddleware, getUsers);

module.exports = router;