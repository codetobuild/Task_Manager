require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");

// require
// const sessionOptions = require("./utils/sessionOptions");
const passwordConfig = require("./auth/passportConfig");
const errorHandler = require("./error/errorHandler");

// loader functions
const startServer = require("./loader/index");
const startDb = require("./loader/db");
startDb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

const MongoStore = require("connect-mongo");

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    collection: "sessions",
  }),
  cookie: {
    maxAge: 7 * 1000 * 60 * 60 * 25, // cookies/sessions will last a week before requiring a re-login
  },
};
app.use(session(sessionOptions));

// passpost js config
passwordConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});
 
console.log("hello server");

app.get("/", (req, res, next) => {
  res.send("<h1>Hello</h1>");
}); 

// api routes
app.use("/api", require("./routes/index"));

// catch errors
app.use(errorHandler);

// production
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// express server startup
startServer(app);

// handle unhandled error close process
process.on("unhandledRejection", (err, promise) => {
  console.log(`Erro: ${err}`);
  server.close(() => process.exit(1));
});

