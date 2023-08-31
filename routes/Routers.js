import  express  from "express";
import {  login, confirmEmail, emailVerify, resetPassword, signup } from "../controllers/authController.js";
import { addLikeCenter, getUser, getUsers, updateUser, updatePhotoProfile } from "../controllers/userController.js";
import { sendMailFromUserToTeam } from "../middlewares/nodemailer.js";
import { addCoursework, addLike, deleteCoursework, getCourseworks, updateCoursework } from "../controllers/courseworkController.js";
import requireAuth from "../middlewares/requireAuth.js";
import { addReservation, getReservations, deleteReservation } from "../controllers/reservationController.js";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router()


// Auth
router.post('/signup', signup)
router.post('/login', login)
router.post('/confirmEmail', confirmEmail)
router.post('/emailVerify', emailVerify)
router.post('/resetPassword', resetPassword)

// User
router.get('/getUser/:userId', getUser)
router.get('/getUsers', getUsers)

// Courseworks
router.get('/getCourseworks', getCourseworks)

// Comments
router.get('/getComments', getComments)

router.post('/sendEmail', async (req,res) => {
    try {
        const message = req.body
        sendMailFromUserToTeam(message)
        res.status(200).json({ message: "تم إرسال الرسالة بنجاح" });
    } catch (error) {
        res.status(400).json({ error: "Server Error" });
    }
})

// Reservation
router.get('/getReservations', getReservations)

// Require
router.use(requireAuth)

// User
router.post('/center/addLike', addLikeCenter)
router.patch('/updateUser/:id', updateUser)
router.patch('/updatePhotoProfile/:id', updatePhotoProfile)

// Coursework
router.post('/addCoursework', addCoursework)
router.post('/coursework/addLike', addLike)
router.patch('/updateCoursework/:id', updateCoursework)
router.delete('/deleteCoursework/:id', deleteCoursework)

// Reservation
router.post('/reservation/:centerId/:id', addReservation)
router.delete('/deleteReservation/:id', deleteReservation)


// Comment
router.post('/addComment', addComment)

export default router;