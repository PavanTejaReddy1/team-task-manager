const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found",
            });
        }

        const jwtToken = token.split(" ")[1];

        const decoded = jwt.verify(
            jwtToken,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid token",
        });

    }
};


const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    next();
};

module.exports = { authMiddleware, adminOnly };