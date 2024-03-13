const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  hours: Number,
  isFree: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  date: Date,
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

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
