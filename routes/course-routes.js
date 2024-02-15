import express from "express";
import {
  addCoursework,
  deleteCoursework,
  getCourseworks,
  getCoursework,
  like,
  updateCoursework,
} from "../controllers/courseworkController.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = express.Router();

router.get("/", getCourseworks);
router.get("/:id", getCoursework);
router.post("/add", requireAuth, addCoursework);
router.post("/like/:id", requireAuth, like);
router.put("/update/:id", requireAuth, updateCoursework);
router.delete("/delete/:id", requireAuth, deleteCoursework);

export default router;
