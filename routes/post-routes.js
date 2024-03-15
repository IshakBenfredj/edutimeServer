const express = require("express");
const requireAuth = require("../middlewares/requireAuth.js");
const { addPost, getPosts } = require("../controllers/postController.js");

const router = express.Router();

// router.get("/:id", getCourse);
router.get("/", getPosts);
router.post("/add", requireAuth, addPost);
// router.put("/update/:id", requireAuth, updateCourse);
// router.post("/like/:id", requireAuth, like);
// router.delete("/delete/:id", requireAuth, deleteCourse);

module.exports = router;