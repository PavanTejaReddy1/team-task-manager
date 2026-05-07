const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      project,
      assignedTo,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate("project", "title")
      .populate("assignedTo", "name email");

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
};