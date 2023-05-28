const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Create a new user
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({ username, password: hashedPassword });

    // Save the user to the database
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User login
exports.login = (req, res) => {
  // TODO: Implement logic for user login
  res.json({ message: "TODO LOGIN" });
};

// User logout
exports.logout = (req, res) => {
  // TODO: Implement logic for user logout
  res.json({ message: "TODO LOG OUT" });
};

// const User = require("../models/user");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");

// exports.login_get = async (req, res) => {
//   const errors = validationResult(req);
//   res.render("login", {
//     title: "Login",
//     errors: errors.array(),
//     user: req.user,
//   });
// };

// exports.login_post = async (req, res, next) => {
//   passport.authenticate(
//     "login",
//     { session: false },
//     async (err, user, info) => {
//       try {
//         if (err || !user) {
//           return res
//             .status(401)
//             .json({ message: "Invalid username or password" });
//         }

//         req.login(user, { session: false }, async (error) => {
//           if (error) return next(error);

//           const body = { _id: user._id, username: user.username };
//           const token = jwt.sign({ user: body }, "parrot", {
//             expiresIn: "1d",
//           });

//           res.send({ token: token });
//         });
//       } catch (error) {
//         return next(error);
//       }
//     }
//   )(req, res, next);
// };

// // LOG OUT
// exports.logout = async (req, res, next) => {
//   res.clearCookie("token");
//   res.redirect("/");
// };
