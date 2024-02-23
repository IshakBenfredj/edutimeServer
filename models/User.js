const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  isCenter: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
    default: false,
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
  public: {
    email: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Boolean,
      default: true,
    },
    address: {
      type: Boolean,
      default: true,
    },
    followers: {
      type: Boolean,
      default: true,
    },
    following: {
      type: Boolean,
      default: true,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
