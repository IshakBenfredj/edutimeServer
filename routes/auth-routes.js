const express = require("express");
const {
  confirmEmail,
  emailVerify,
  getAuthUser,
  googleAuth,
  login,
  resetPassword,
  signup,
} = require("../controllers/authController.js");

const router = express.Router();

router.get("/:token", getAuthUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.post("/confirmEmail", confirmEmail);
router.post("/emailVerify", emailVerify);
router.post("/resetPassword", resetPassword);

module.exports = router;
