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
