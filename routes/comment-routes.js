const express = require("express");
const {
  addComment,
  deleteComment,
  getComments,
  getCommentsById
} = require("../controllers/commentController.js");
const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.get("/", getComments);
router.get("/:id", getCommentsById);
router.post("/add", requireAuth, addComment);
router.delete("/delete/:id", requireAuth, deleteComment);

module.exports = router;