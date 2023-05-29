const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Post = require("../models/post");
const mongoose = require("mongoose");

// Create a comment
exports.comment_create = async (req, res) => {
  try {
    // Destructure the comment content and post ID from the request body
    const { content, user } = req.body;
    const postId = req.params.postid;

    // Check if the post ID is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Create a new comment instance
    const newComment = new Comment({
      content: content,
      postId: postId,
      user: user, // Assuming you have a user object in the request
    });

    // Save the new comment to the database
    const savedComment = await newComment.save();

    res.json({
      message: "Comment created successfully",
      comment: savedComment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating comment" });
  }
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
