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
exports.comment_detail = async (req, res) => {
  try {
    // Retrieve the comment ID from the request parameters
    const commentId = req.params.commentid;

    // Logic to find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Return the retrieved comment as the response
    res.json({ comment });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all comments
exports.comment_list = async (req, res, next) => {
  try {
    const postId = req.params.postid;

    // Check if the post ID is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find the comments with the specified postId
    const comments = await Comment.find({ postId: postId });

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for the post" });
    }

    res.json({ comments });
  } catch (err) {
    next(err);
  }
};

// Delete a comment
exports.comment_delete = async (req, res, next) => {
  try {
    const commentId = req.params.commentid;

    // Check if id is valid
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    await Comment.findByIdAndRemove(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete all comments of a post
exports.comment_delete_all = async (req, res, next) => {
  try {
    const postId = req.params.postid;

    // Check if id is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find and remove all comments with the matching postId
    await Comment.deleteMany({ postId: postId });

    res.json({ message: "Comments deleted successfully" });
  } catch (err) {
    next(err);
  }
};
