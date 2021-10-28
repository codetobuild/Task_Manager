const passport = require("passport");
const { User } = require("../db/userModel");
const Task = require("../db/taskModel");

const CustomError = require("../error/customError");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    console.log(tasks);
    return res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    return next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate("createdBy");
    if (!task) {
      return next(new CustomError("task not found", 400));
    }

    console.log("created by", task);
    return res.status(200).json({ success: true, data: task });
  } catch (err) {
    return next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    console.log("task user", req.user);
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      createdBy: req.user.id,
    });

    if (!task) {
      return next(new CustomError("task creation error", 400));
    }
    const newTask = await Task.findOne({ id: task.id }).populate("createdBy");

    return res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    return next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updateTask = await Task.findByIdAndUpdate(taskId, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updateTask) {
      return next(new CustomError("update error", 400));
    }
    return res.status(201).json({ success: true, data: updateTask });
  } catch (err) {
    return next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    return res
      .status(202)
      .json({ success: true, message: "task deleted successfully" });
  } catch (err) {
    return next(err);
  }
};
