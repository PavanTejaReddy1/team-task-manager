const express = require("express");

const {
    createTask,
    getTasks,
    updateTaskStatus,
} = require("../controllers/taskController");

const {
    authMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/all", authMiddleware, getTasks);
router.put("/update/:id", authMiddleware, updateTaskStatus);

module.exports = router;