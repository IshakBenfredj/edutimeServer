import mongoose from "mongoose";
const Scheme = mongoose.Schema;

const userSchema = new Scheme({
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
  likes: {
    type: [String],
    default: [],
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  notifyCount: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
  },
  isMan: {
    type: Boolean,
  },
  bio: {
    type: String,
  },
  fromGoogle: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
