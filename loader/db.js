const mongoose = require("mongoose");

const startDb = () => {
  let dburl = `mongodb://localhost:27017/task-Manager`;
  if (process.env.NODE_ENV == "production") {
    dburl = process.env.DB_URL;
  }
  mongoose.connect(dburl, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DB connected");
  });
};

module.exports = startDb;
