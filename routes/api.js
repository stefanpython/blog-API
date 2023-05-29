const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// TODO: - create normal sing-up router
//       - create login router and also create token inside this route
//       - create logout

////////////////////// END ///////////////////////////

// const fs = require("fs");
// const localToken = require("../localToken.json");

// router.get("/createtoken", async (req, res) => {
//   const user = await User.findOne();

//   const token = jwt.sign({ user: user }, "secret");

//   console.log("token:", token);

//   await fs.writeFile(
//     "token.json",
//     JSON.stringify({ Authorization: `Bearer ${token}` }),
//     (err) => {
//       if (err) throw err;
//       console.log("Updated token file");
//     }
//   );

//   res.send("Create token");
// });

// router.get(
//   "/messages",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     console.log("Authorization token: ", localToken.Authorization);

//     // const result = await jwt.verify(
//     //   localToken.Authorization.substring(7),
//     //   "secret"
//     // );

//     res.json({ message: "Authenticated" });
//   }
// );

///////////////// ROUTES /////////////////////////

/* index route*/
router.get("/", function (req, res, next) {
  res.redirect("/api/posts");
});

// POST CONTROLLER

// read/get all posts - api/posts
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_list
);

// create post - api/posts
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_create
);

// read/get post - api/posts/:id
router.get("/posts/:id", post_controller.post_detail);

// update post - api/posts/:postid
router.put("/posts/:id", post_controller.post_update);

// delete post - api/posts/:postid
router.delete("/posts/:id", post_controller.post_delete);

// COMMENT ROUTES

// create comment - api/posts/:postid/comments
router.post("/posts/:postid/comments", comment_controller.comment_create);

// read/get single comment - api/posts/:postid/comments/:commentid
router.get(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_detail
);

// read/get all comments - api/posts/:postid/comments
router.get("/posts/:postid/comments", comment_controller.comment_list);

// DELETE ALL POST COMMENTS
router.delete("/posts/:postid/comments", comment_controller.comment_delete_all);

// delete comment - api/posts/:postid/comments/:commentid
router.delete(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_delete
);

// USER CONTROLLER

// create author - api/signup
router.post("/sign-up", user_controller.signup);

// login - api/login
router.post("/login", user_controller.login);

// TODO:
// logout - api/logout
router.get("/logout", user_controller.logout);

module.exports = router;
