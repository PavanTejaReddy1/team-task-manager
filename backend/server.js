const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("Connected to DB") })
    .catch((err) => { console.log(err.message) });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });