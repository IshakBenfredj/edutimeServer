const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User.js");
const sendMail = require("../middlewares/nodemailer.js");
dotenv.config();

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const signup = async (req, res) => {
  try {
    // Create Account
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      isCenter: req.body === "center",
      isAdmin: req.body.email === "edutime19@gmail.com",
      password: hash,
    });
    const user = await newUser.save();

    const token = generateToken(user._id);
    delete user.password;

    res.status(201).json({ message: "تم إنشاء الحساب بنجاح", user, token });
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "مستخدم غير موجود" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ error: " البريد الإلكتروني أو كلمة السر غير صحيحة" });
    }

    const token = generateToken(user._id);

    res.status(201).json({ user, token });
    next();
  } catch (error) {
    return res.status(500).json({ error: "خطأ بالسيرفر,حاول مجددا" });
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const { googleUser } = req.body;
    const user = await User.findOne({ email: googleUser.email });
    if (user) {
      const token = generateToken(user._id);
      return res.status(200).json({ user, token });
    } else {
      const isAdmin = googleUser.email === "edutime19@gmail.com";
      const newUser = new User({
        name: googleUser.displayName,
        email: googleUser.email,
        image: googleUser.photoURL,
        phone: googleUser.phoneNumber,
        isAdmin,
        checkmark: true,
        fromGoogle: true,
      });
      if (isAdmin) {
        newUser.isCenter = true
      }
      const user = await newUser.save();
      const token = generateToken(user._id);
      return res.status(200).json({ user, token });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const { token } = req.params;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken || !decodedToken._id) {
      return res.json({ success: false });
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.json({ success: false });
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: "Server error" });
  }
};

const confirmEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(404)
        .json({ error: "هذا البريد الإلكتروني مستعمل بالفعل" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const message =
      "السلام عليكم , هذا هو الرمز الخاص بك لتأكيد البريد الإلكتروني خاصتك";
    const title = "Confirm Email";
    sendMail(email, code, title, message);

    res.status(201).json({ code });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

const emailVerify = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "هذا البريد غير موجود!" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const message =
      "السلام عليكم , هذا هو الرمز الخاص بك لتأكيد البريد الإلكتروني خاصتك من أجل تغيير كلمة السر خاصتك";
    const title = "Reset Password";
    sendMail(email, code, title, message);

    res.status(201).json({ code, user });
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, id } = req.body;

    const user = await User.findById(id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(201).json({ message: "تم تغيير كلمة السر بنجاح" });
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  signup,
  login,
  googleAuth,
  getAuthUser,
  confirmEmail,
  emailVerify,
  resetPassword,
};
