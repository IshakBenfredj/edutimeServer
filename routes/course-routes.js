const express = require("express");
const {
  addCoursework,
  deleteCoursework,
  getCourseworks,
  getCoursework,
  like,
  updateCoursework,
} = require("../controllers/courseworkController.js");
const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.get("/", getCourseworks);
router.get("/:id", getCoursework);
router.post("/add", requireAuth, addCoursework);
router.post("/like/:id", requireAuth, like);
router.put("/update/:id", requireAuth, updateCoursework);
router.delete("/delete/:id", requireAuth, deleteCoursework);

module.exports = router;