var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  const mongoURI =
    "mongodb+srv://dementia1349:test@cluster0.zw0djkv.mongodb.net/blog?retryWrites=true&w=majority";
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

// Define the "login" strategy
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

// HARD CODED TOKEN FOR TEST
function getToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NmY3NGYzNzlhNTdhMzllMzBlM2UyZSIsInVzZXJuYW1lIjoiY2F0IiwicGFzc3dvcmQiOiJxcXEifSwiaWF0IjoxNjg1MjY3MzI0fQ.MUOesSXrknsz1fIqpjINBjS5YWJf_tInPGAT_pQGUmY";
}

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "secret",
      jwtFromRequest: getToken, // Test token
      // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
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
