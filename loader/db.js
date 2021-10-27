const mongoose = require("mongoose");

const startDb = () => {
  let url = `mongodb://localhost:27017/taskManager`;
  if (process.env.NODE_ENV == "production") {
    url = process.env.DB_URL;
  }

  mongoose.connect(url, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DB connected");
  });
};

module.exports = startDb;
