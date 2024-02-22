const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  followers: {
    type: [String],
    default: [],
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  fromGoogle: {
    type: Boolean,
    default: false,
  },
  checkmark: {
    type: Boolean,
    default: false,
  },
  private: {
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Boolean,
      default: false,
    },
    following: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;