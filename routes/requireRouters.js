import  express  from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { addCoursework, deleteCoursework } from "../controllers/courseworkController.js";

const router = express.Router()

// Require
router.use(requireAuth)

// Coursework
router.post('/addCoursework', addCoursework)
router.delete('/deleteCoursework/:id', deleteCoursework)

export default router;