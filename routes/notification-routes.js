const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth.js");
const Notification = require("../models/Notification.js");

//new conv

router.post("/", requireAuth, async (req, res) => {
  try {
    const notification = await Notification.create({ ...req.body });

    res.status(201).json(notification);
  } catch (err) {
    console.error("Error creating notification:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get conv of a user

router.get("/", requireAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userTo: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", requireAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userTo: req.user._id,
      isNewNot: true,
    });

    for (const notification of notifications) {
      notification.isNewNot = false;
      await notification.save();
    }

    res
      .status(200)
      .json({ message: "isNew set to false for all relevant notifications." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
