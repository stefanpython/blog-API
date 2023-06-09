const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

// Get all posts
exports.post_list = async (req, res) => {
  try {
    // Fetch all posts from database
    const posts = await Post.find({});

    res.json({ message: "Success", posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving posts" });
  }
};

// Create a new post
exports.post_create = [
  // Sanitize and validate inputs
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),

  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Destructure title and content from req body
      const { title, content } = req.body;

      const postAuthor = await User.findById(req.user._id)
        .populate("username")
        .exec();

      // Create a new post instance
      const newPost = new Post({
        title: title,
        content: content,
        author: req.user._id,
        authorName: postAuthor.username,
      });

      // Save the new post to the database
      const savedPost = await newPost.save();
      res.json({ message: "Create post successfully." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error in creating post" });
    }
  },
];

// Get a single post
exports.post_detail = async (req, res) => {
  try {
    // Request post id from params
    const postId = req.params.id;

    // Check if id is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find post with the valid id
    const post = await Post.findById(postId);

    if (!post) {
      // If the post is null, return the "Post not found" message
      return res.status(404).json({ message: "Post not found" });
    }

    // Send the retrieved post as the response
    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a post
exports.post_update = [
  // Sanitize and validate inputs
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),

  async (req, res) => {
    try {
      // Check for validation error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Retrieve post id from params
      const postId = req.params.id;

      // Find the post by id
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const postAuthor = await User.findById(req.user._id)
        .populate("username")
        .exec();

      // Update the post with the new data
      post.title = req.body.title;
      post.content = req.body.content;
      post.authorName = req.body.authorName;

      // Save the updated post to the database
      const updatedPost = await post.save();
      res.json({ message: "Post updated successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error in updating post" });
    }
  },
];

// Delete a post
exports.post_delete = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Check if id is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    await Post.findByIdAndRemove(postId);
    res.json({ message: "Deleted post successfuly" });
  } catch (err) {
    next(err);
  }
};
