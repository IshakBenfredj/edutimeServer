const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseworkSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there is a User model
    required: true,
  },
  image: String,
  name: {
    type: String,
    required: true,
  },
  phone: String,
  category: {
    type: String,
    required: true,
  },
  price: Number,
  isFree: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  place: String,
  certificate: {
    type: Boolean,
    default: false,
  },
  description: String,
});

const Coursework = mongoose.model("Coursework", courseworkSchema);

module.exports = Coursework;
