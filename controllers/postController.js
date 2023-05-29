const { validationResult } = require("express-validator");
const Post = require("../models/post");

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
exports.post_create = async (req, res) => {
  try {
    // Destructure title and content from req body
    const { title, content } = req.body;

    // Create a new post instance
    const newPost = new Post({
      title: title,
      content: content,
      author: req.user._id,
    });

    // Save the new post to the database
    const savedPost = await newPost.save();
    res.json({ message: "Create post successfuly." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in creating post" });
  }
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
