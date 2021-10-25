const { User } = require("../db/userModel");
const Task = require("../db/taskModel");
const CustomError = require("../error/customError");

const authUpdate = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log("task", String(task.createdBy));
    console.log("update user", String(req.user.id));
    if (String(task.createdBy) !== String(req.user.id)) {
      return next(new CustomError("unauthorized to update", 401));
    }
    console.log("you are auth to update");
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authUpdate;
