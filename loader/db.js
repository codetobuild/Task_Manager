const mongoose = require("mongoose");

const startDb = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DB connected");
  });

};

module.exports = startDb;
