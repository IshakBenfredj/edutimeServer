const express = require("express");
const {
  addBlog,
  deleteBlog,
  disLikeBlog,
  getBlogById,
  getBlogs,
  likeBlog,
} = require("../controllers/blogController.js");
const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/add", requireAuth, addBlog);
router.delete("/delete/:id", requireAuth, deleteBlog);
router.put("/like/:id", requireAuth, likeBlog);
router.put("/dislike/:id", requireAuth, disLikeBlog);

module.exports = router;