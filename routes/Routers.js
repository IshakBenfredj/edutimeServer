import  express  from "express";
import {  login, confirmEmail, emailVerify, resetPassword, signup } from "../controllers/authController.js";
import { likeCenter, getUser, getUsers, updateUser, updatePhotoProfile, resetNotify } from "../controllers/userController.js";
import { sendMailFromUserToTeam } from "../middlewares/nodemailer.js";
import { addCoursework, like, deleteCoursework, getCourseworks, updateCoursework } from "../controllers/courseworkController.js";
import requireAuth from "../middlewares/requireAuth.js";
import { addReservation, getReservations, deleteReservation } from "../controllers/reservationController.js";
import { addComment, deleteComment, getComments } from "../controllers/commentController.js";
import { getOffers } from "../controllers/offersController.js";

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
router.patch('/resetNotify/:id', resetNotify)

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

// Offers
router.get('/getOffers', getOffers)

// Require
router.use(requireAuth)

// User
router.post('/center/like', likeCenter)
router.patch('/updateUser/:id', updateUser)
router.patch('/updatePhotoProfile/:id', updatePhotoProfile)

// Coursework
router.post('/addCoursework', addCoursework)
router.post('/coursework/like', like)
router.patch('/updateCoursework/:id', updateCoursework)
router.delete('/deleteCoursework/:id', deleteCoursework)

// Reservation
router.post('/reservation/:centerId/:id', addReservation)
router.delete('/deleteReservation/:id', deleteReservation)


// Comment
router.post('/addComment', addComment)
router.delete('/deleteComment/:id', deleteComment)

export default router;