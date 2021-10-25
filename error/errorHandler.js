
const CustomError = require("./customError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message || "server error";
  error.statusCode = error.statusCode || 500;

  if (error.code === 11000) {
    const message = `Duplicate field value Enter`;
    error = new CustomError(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => {
      //   console.log(val.message);
      return val.message;
    });
    error = new CustomError(message, 400);
  }
  
  console.log(err.message);

  return res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

module.exports = errorHandler;
