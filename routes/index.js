const express = require("express");
const Router = express.Router();

Router.use("/auth", require("./auth"));
Router.use("/tasks", require("./tasks"));

module.exports = Router;
