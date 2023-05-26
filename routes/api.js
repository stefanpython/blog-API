const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// ROUTES

/* index route*/
router.get("/", function (req, res, next) {
  res.redirect("/api/posts");
});

// read/get all posts - api/posts
router.get("/posts", (req, res) => {
  res.send("TODO SEE ALL POSTS");
});

// create post - api/posts
router.post("/posts", (req, res) => {
  res.send("TODO CREATE POST");
});

// read/get post - api/posts/:id
router.get("/posts/:id", (req, res) => {
  res.send("TODO READ A SINGLE POST");
});

// update post - api/posts/:postid
router.put("/posts/:id", (req, res) => {
  res.send("TODO UPDATE POST");
});

// delete post - api/posts/:postid
router.delete("/posts/:id", (req, res) => {
  res.send("TODO DELETE POST");
});

// create comment - api/posts/:postid/comments
router.post("/posts/:postid/comments", (req, res) => {
  res.send("TODO CREATE COMMENT");
});

// read/get single comment - api/posts/:postid/comments/:commentid
router.get("/posts/:postid/comments/:commentid", (req, res) => {
  res.send("TODO READ SINGLE COMMENT");
});

// read/get all comments - api/posts/:postid/comments
router.get("/posts/:postid/comments", (req, res) => {
  res.send("TODO LIST OF ALL COMMENTS");
});

// DELETE ALL POST COMMENTS
router.delete("/posts/:postid/comments", (req, res) => {
  res.send("TODO DELETE ALL COMMENTS");
});

// delete comment - api/posts/:postid/comments/:commentid
router.delete("/posts/:postid/comments/:commentid", (req, res) => {
  res.send("TODO DELETE A SINGLE COMMENT");
});

// create author - api/signup
router.post("/sign-up", (req, res) => {
  res.send("TODO CREATE AUTHOR");
});

// login - api/login
router.post("/login", (req, res) => {
  res.send("TODO LOGIN");
});

// logout - api/logout
router.get("/logout", (req, res) => {
  res.send("TODO LOG OUT");
});

module.exports = router;
