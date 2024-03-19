const express = require("express");
const {
  addCourse,
  deleteCourse,
  getCourses,
  getCourse,
  like,
  updateCourse,
  getCoursesById,
} = require("../controllers/courseController.js");
const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.get("/user/:userId", getCoursesById);
router.post("/add", requireAuth, addCourse);
router.put("/update/:id", requireAuth, updateCourse);
router.post("/like/:id", requireAuth, like);
router.delete("/delete/:id", requireAuth, deleteCourse);

module.exports = router;
