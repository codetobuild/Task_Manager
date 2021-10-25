const express = require("express");
const Router = express.Router();
const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

const authUser = require("../middleware/authUser");
const authUpdate = require("../middleware/authUpdate");

Router.use(authUser);

Router.get("/", getAllTasks);
Router.get("/:id", getTask);
Router.post("/new", createTask);
Router.put("/:id/update", authUpdate, updateTask);
Router.delete("/:id/delete", authUpdate, deleteTask);

module.exports = Router;
