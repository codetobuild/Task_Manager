const express = require("express");
const Router = express.Router();
const { User } = require("../db/userModel");
const userExist = require("../middleware/userExist");

const {
  registerUser,
  loginUser,
  isLoggedIn,
  logoutUser,
} = require("../controllers/user");

Router.get("/", (req, res) => {
  res.json({ success: true, message: "auth route working" });
});

Router.post("/register", userExist, registerUser);
Router.post("/login", loginUser);
Router.get("/isLoggedIn", isLoggedIn);
Router.get("/logout", logoutUser);

Router.get("/user", async (req, res, next) => {
  try {
    // const user = await User.findOne({ email: req.body.email });
    res.json({ data: req.user });
  } catch (err) {
    next(err);
  }
});

Router.post("/user/edit", async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!updateUser) {
      return next(new CustomError("update error", 400));
    }
    return res.status(201).json({ success: true, data: updateUser });
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
