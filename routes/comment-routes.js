const express = require("express");
const {
  addComment,
  deleteComment,
  getComments,
} = require("../controllers/commentController.js");
const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.get("/", getComments);
router.post("/add", requireAuth, addComment);
router.delete("/delete/:id", requireAuth, deleteComment);

module.exports = router;