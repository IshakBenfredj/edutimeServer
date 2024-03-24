const { uploadImage, deleteImage } = require("../middlewares/uploadImage.js");
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

const getPostsById = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ userId: id }).sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const like = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    const userIndex = post.likes.indexOf(req.user._id);

    if (userIndex === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(userIndex, 1);
    }
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (post.image) {
      await deleteImage(post.image);
    }
    res.status(201).json({ message: "تم حذف المناقشة" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addPost,
  getPosts,
  getPostsById,
  getPostById,
  like,
  deletePost,
};
