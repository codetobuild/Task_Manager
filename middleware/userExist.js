const { User } = require("../db/userModel");
const CustomError = require("../error/customError");

const userExist = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      return next(new CustomError("User with this email already exist", 400));
    }
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userExist;
