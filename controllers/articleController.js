const Article = require("../models/Article.js");

const addArticle = async (req, res) => {
  try {
    const { description, title } = req.body;
    const { userId } = req.params;
    const image = req.file ? req.file.filename : "";
    const newArticle = new Article({
      title,
      description,
      userId,
      image,
    });
    const savedArticle = await newArticle.save();
    res.status(201).json({
      message: "تم إضافة المقال",
      article: savedArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      res.status(404).json({ message: "not found" });
    }

    res.status(200).json({ article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);

    res.status(200).json({ message: "تم حذف المقال" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const likeArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    const userIndex = article.likes.indexOf(req.user._id);
    const userIndexDis = article.disLikes.indexOf(req.user._id);

    if (userIndex === -1) {
      article.likes.push(req.user._id);
      if (userIndexDis !== -1) {
        article.disLikes.splice(userIndexDis, 1);
      }
    } else {
      article.likes.splice(userIndex, 1);
    }

    await article.save();
    res.status(201).json({ article });
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const disLikeArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    const userIndex = article.likes.indexOf(req.user._id);
    const userIndexDis = article.disLikes.indexOf(req.user._id);

    if (userIndexDis === -1) {
      article.disLikes.push(req.user._id);
      if (userIndex !== -1) {
        article.likes.splice(userIndex, 1);
      }
    } else {
      article.disLikes.splice(userIndexDis, 1);
    }

    await article.save();
    res.status(201).json({ article });
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  likeArticle,
  disLikeArticle,
};
