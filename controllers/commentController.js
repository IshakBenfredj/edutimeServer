const Comment = require("../models/Comment.js");

const addComment = async (req, res) => {
  try {
    const { comment, id } = req.body;
    const commentObj = {
      userId: req.user._id,
      id,
      comment,
    };
    await Comment.create(commentObj);
    res.status(201).json({ message: "تم التعليق" });
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
};
