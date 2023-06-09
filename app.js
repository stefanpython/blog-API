var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// PASSPORT STUFF
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

const User = require("./models/user");

// Connect to MongoDB
async function main() {
  const mongoURI = process.env.MONGODB_URI;
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB Atlas!");
}

main().catch((err) => console.log(err));

// Define express app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(expressLayouts);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/// Define the "login" strategy
passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      // Logic for verifying the username and password
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Invalid username" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Invalid password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const user = await User.findById(token.userId);

        if (!user) {
          // User not found in the database, token is invalid
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

app.use(passport.initialize());
app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
