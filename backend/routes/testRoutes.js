const express = require("express");

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route accessed",
        user: req.user,
    });

});

router.get("/admin", authMiddleware, adminOnly, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin",
    });

});

module.exports = router;