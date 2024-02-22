const mongoose = require("mongoose");

const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    courseworkId: {
      type: Schema.Types.ObjectId,
      ref: "Coursework",
      required: true,
    },
    centerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reservator: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: String, required: true },
    phone: { type: String, required: true },
    wilaya: { type: String, required: true },
    etat: { type: String, default: "wait" },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;