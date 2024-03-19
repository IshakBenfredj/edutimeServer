const uploadImage = require("../middlewares/uploadImage.js");
const Blog = require("../models/Blog.js");

const addBlog = async (req, res) => {
  try {
    const url = await uploadImage(req.body.image);
    const blog = new Blog({
      ...req.body,
      image: url,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);

    res.status(200).json({ message: "تم حذف المقال" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    const userIndex = blog.likes.indexOf(req.user._id);
    const userIndexDis = blog.dislikes.indexOf(req.user._id);

    if (userIndex === -1) {
      blog.likes.push(req.user._id);
      if (userIndexDis !== -1) {
        blog.dislikes.splice(userIndexDis, 1);
      }
    } else {
      blog.likes.splice(userIndex, 1);
    }

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const disLikeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    const userIndex = blog.likes.indexOf(req.user._id);
    const userIndexDis = blog.dislikes.indexOf(req.user._id);

    if (userIndexDis === -1) {
      blog.dislikes.push(req.user._id);
      if (userIndex !== -1) {
        blog.likes.splice(userIndex, 1);
      }
    } else {
      blog.dislikes.splice(userIndexDis, 1);
    }

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
  likeBlog,
  disLikeBlog,
};
