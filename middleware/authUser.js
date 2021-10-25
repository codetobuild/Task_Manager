const User = require("../db/userModel");
const CustomError = require("../error/customError");

const authUser = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return next(new CustomError("User unauthorized", 401));
    } else {
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = authUser;
