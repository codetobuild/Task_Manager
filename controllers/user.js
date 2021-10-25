const passport = require("passport");

const { User } = require("../db/userModel");
const CustomError = require("../error/customError");

exports.registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, password, job, location } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      job,
      location,
    });
    if (!user) {
      return next(new CustomError("Register failed", 400));
    }

    return res.status(201).json({ success: true, message: "user registered" });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    passport.authenticate("local", function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "invalid credentials" });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        const data = {
          id: user.id,
          username: user.username,
          email: user.email,
          job: user.job,
          location: user.location,
        };
        return res.status(200).json({ success: true, data: data });
      });
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.isLoggedIn = (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();
  console.log(req.isAuthenticated);
  if (isLoggedIn) {
    return res.status(200).json({ success: true, login: true, data: null });
  } else {
    return res.status(200).json({ success: false, login: false, data: null });
  }
};

exports.logoutUser = (req, res, next) => {
  req.logout();
  res.send({ success: true, logout: true, message: "user logged out" });
};
