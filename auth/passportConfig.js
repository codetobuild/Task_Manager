const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/userModel");
const passwordUtils = require("../utils/passwordUtils");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return done(null, false);
    }
    const isValid = await passwordUtils.validatePassword(
      password,
      user.password
    );

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

// configuration function
const passwordConfig = (passport) => {
  const strategy = new LocalStrategy(customFields, verifyCallback);
  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(userId);
    if (user) {
      done(null, user);
    }
  });
};

module.exports = passwordConfig;
