const { validationResult } = require("express-validator");
const Comment = require("../models/comment");

// Create a comment
exports.comment_create = (req, res) => {
  // TODO: Implement logic to create a comment
  res.json({ message: "TODO CREATE COMMENT" });
};

// Get a single comment
exports.comment_detail = (req, res) => {
  // TODO: Implement logic to get a single comment
  res.json({ message: "TODO READ SINGLE COMMENT" });
};

// Get all comments
exports.comment_list = (req, res) => {
  // TODO: Implement logic to get all comments
  res.json({ message: "TODO LIST OF ALL COMMENTS" });
};

// Delete all comments of a post
exports.comment_delete_all = (req, res) => {
  // TODO: Implement logic to delete all comments of a post
  res.json({ message: "TODO DELETE ALL COMMENTS" });
};

// Delete a comment
exports.comment_delete = (req, res) => {
  // TODO: Implement logic to delete a comment
  res.json({ message: "TODO DELETE A SINGLE COMMENT" });
};
