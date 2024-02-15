import  express  from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { deleteCenter, getUser, getUsers, likeCenter, resetNotify, updatePhotoProfile, updateUser } from "../controllers/userController.js";
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/resetNotify/:id', resetNotify)

router.post('/like/:id',requireAuth, likeCenter)
router.put('/update',requireAuth, updateUser)
router.put('/updatePhotoProfile',requireAuth, updatePhotoProfile)
router.delete('/delete/:id',requireAuth, deleteCenter)

export default router;