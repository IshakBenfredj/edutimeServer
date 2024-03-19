const express = require("express");
const requireAuth = require("../middlewares/requireAuth.js");
const { addPost, getPosts, like,deletePost, getPostsById } = require("../controllers/postController.js");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostsById);
router.post("/add", requireAuth, addPost);
router.put("/like/:id", requireAuth, like);
router.delete("/delete/:id", requireAuth, deletePost);

module.exports = router;
