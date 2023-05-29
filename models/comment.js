const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", commentSchema);
