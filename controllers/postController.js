const { validationResult } = require("express-validator");
const Post = require("../models/post");

// Get all posts
exports.post_list = (req, res) => {
  // TODO: Implement logic to get all posts
  res.json({ message: "TODO SEE ALL POSTS" });
};

// Create a new post
exports.post_create = (req, res) => {
  // TODO: Implement logic to create a new post
  res.json({ message: "TODO CREATE POST" });
};

// Get a single post
exports.post_detail = (req, res) => {
  // TODO: Implement logic to get a single post
  res.json({ message: "TODO READ A SINGLE POST" });
};

// Update a post
exports.post_update = (req, res) => {
  // TODO: Implement logic to update a post
  res.json({ message: "TODO UPDATE POST" });
};

// Delete a post
exports.post_delete = (req, res) => {
  // TODO: Implement logic to delete a post
  res.json({ message: "TODO DELETE POST" });
};
