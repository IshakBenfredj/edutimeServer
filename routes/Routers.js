import express from "express";
import { sendMailFromUserToTeam } from "../middlewares/nodemailer.js";

const router = express.Router();

router.post("/sendEmail", async (req, res) => {
  try {
    const message = req.body;
    sendMailFromUserToTeam(message);
    res.status(200).json({ message: "تم إرسال الرسالة بنجاح" });
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
  }
});

export default router;
