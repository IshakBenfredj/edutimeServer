import  express  from "express";
import {  login, confirmEmail, emailVerify, resetPassword, signup } from "../controllers/authController.js";
import { getUser, getUsers } from "../controllers/userController.js";
import { sendMailFromUserToTeam } from "../middlewares/nodemailer.js";
import { getCourseworks } from "../controllers/courseworkController.js";
const router = express.Router()


// Auth
router.post('/login', login)
router.post('/confirmEmail', confirmEmail)
router.post('/emailVerify', emailVerify)
router.post('/resetPassword', resetPassword)
router.post('/signup', signup)

// User
router.get('/getUser/:userId', getUser)
router.get('/getUsers', getUsers)

// Courseworks
router.get('/getCourseworks', getCourseworks)



router.post('/sendEmail', async (req,res) => {
    try {
        const message = req.body
        sendMailFromUserToTeam(message)
        res.status(200).json({ message: "تم إرسال الرسالة بنجاح" });
    } catch (error) {
        res.status(400).json({ error: "Server Error" });
    }
})

export default router;