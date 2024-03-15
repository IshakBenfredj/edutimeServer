const uploadImage = require("../middlewares/uploadImage.js");
const Post = require("../models/Post.js");

const addPost = async (req, res) => {
  try {
    const postData = {
      userId: req.user._id,
      text: req.body.text,
      title: req.body.title,
    };

    if (req.body.image && req.body.image.length > 0) {
      const url = await uploadImage(req.body.image);
      postData.image = url;
    }

    const post = new Post(postData);
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addPost,
  getPosts,
};
