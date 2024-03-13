const Comment = require("../models/Comment.js");

const addComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, userId: req.user._id });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getComments = async (req, res) => {
  try {
    const allComments = await Comment.find();
    const comments = allComments.reverse();

    res.status(201).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getCommentsById = async (req, res) => {
  try {
    const allComments = await Comment.find({ postId: req.params.id });
    const comments = allComments.reverse();

    res.status(201).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(201).json({ message: "تم حذف التعليق" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
  getCommentsById
};
