const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userFrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "follow",
        "blog",
        "course",
        "reservation",
        "changeRequest",
        "docRequest",
      ],
      required: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    isNewNot: { type: Boolean, default: true },
    accept: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
