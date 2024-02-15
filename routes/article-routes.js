import express from "express";
import {
  addArticle,
  deleteArticle,
  disLikeArticle,
  getArticleById,
  getArticles,
  likeArticle,
} from "../controllers/articleController.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/add", requireAuth, addArticle);
router.delete("/delete/:id", requireAuth, deleteArticle);
router.patch("/like/:id", requireAuth, likeArticle);
router.patch("/disLike/:id", requireAuth, disLikeArticle);

export default router;
