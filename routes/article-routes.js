const express = require("express");
const {
  addArticle,
  deleteArticle,
  disLikeArticle,
  getArticleById,
  getArticles,
  likeArticle,
} = require("../controllers/articleController.js");
const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/add", requireAuth, addArticle);
router.delete("/delete/:id", requireAuth, deleteArticle);
router.patch("/like/:id", requireAuth, likeArticle);
router.patch("/disLike/:id", requireAuth, disLikeArticle);

module.exports = router;