const mongoose = require("mongoose");
const passwordUtils = require("../utils/passwordUtils");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user name required"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user password required"],
    select: false,
  },
  job: {
    type: String,
    required: [true, "user job required"],
  },
  location: {
    type: String,
    required: [true, "user location required"],
  },
});

// pre save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await passwordUtils.hashPassword(this.password);
  next();
});

exports.userSchema = userSchema;

const User = mongoose.model("User", userSchema);
exports.User = User;
