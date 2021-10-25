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

module.exports = sessionOptions;
