const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;
    const project = await Project.create({ title, description, members, createdBy: req.user.id });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProjects = async (req, res) => {
  try { 
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createProject, getProjects };