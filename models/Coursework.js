const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseworkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  dateStart: { type: String, required: true },
  place: { type: String, required: true },
  hours: { type: Number, required: true },
  likes: { type: Array, default: [] },
  personsCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  description: { type: String, required: true },
  activation: { type: Boolean, default: false },
  activationDate: Date,
  createdAt: { type: Date, default: new Date() },
});

const Coursework = mongoose.model("Coursework", courseworkSchema);

module.exports = Coursework;
