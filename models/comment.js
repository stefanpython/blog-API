const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: String, required: true },
  postId: { type: String, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
