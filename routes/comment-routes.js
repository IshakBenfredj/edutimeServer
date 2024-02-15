import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = express.Router();

router.get("/", getComments);
router.post("/add", requireAuth, addComment);
router.delete("/delete/:id", requireAuth, deleteComment);

export default router;
