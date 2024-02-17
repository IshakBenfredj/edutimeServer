import express from "express";
import {
  confirmEmail,
  emailVerify,
  getAuthUser,
  googleAuth,
  login,
  resetPassword,
  signup,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/getAuthUser/:token", getAuthUser);
router.post("/confirmEmail", confirmEmail);
router.post("/emailVerify", emailVerify);
router.post("/resetPassword", resetPassword);

export default router;
