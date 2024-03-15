const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String },
    title: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
