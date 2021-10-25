const mongoose = require("mongoose");
const passwordUtils = require("../utils/passwordUtils");
const { User } = require("../db/userModel");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "task title required"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "status required"],
    enum: ["todo", "progress", "completed"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "createdBy required"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
exports.taskSchema = taskSchema;
