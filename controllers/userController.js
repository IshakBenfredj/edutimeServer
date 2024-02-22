const Coursework = require("../models/Coursework.js");
const Reservation = require("../models/Reservation.js");
const User = require("../models/User.js");
const uploadImage = require("../middlewares/uploadImage.js");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "user doesn't exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const usersFind = await User.find();
    const users = usersFind.reverse();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
  }
};

const like = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const userIndex = user.followers.indexOf(req.user._id);

    if (userIndex === -1) {
      user.followers.push(req.user._id);
    } else {
      user.followers.splice(userIndex, 1);
    }
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const updatePhotoProfile = async (req, res) => {
  try {
    const { image } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const url = await uploadImage(image);
    user.image = url;
    await user.save();
    return res
      .status(201)
      .json({ message: "تم تحديث صورة الملف الشخصي", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { field, value, isPrivate } = req.body;
    const { _id } = req.user;

    if (_id != id) {
      return res.status(403).json({ error: "محاولة تحديث غير آمنة" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "مستخدم غير موجود" });
    }

    if (isPrivate !== "null") {
      user[field] = value;
      user.private[field] = isPrivate;
    }

    user[field] = value;

    await user.save();
    console.log(user);

    if (!user.fromGoogle) {
      delete user.password;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const resetNotify = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.notifyCount = 0;
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const center = await User.findById(id);

    await Reservation.deleteMany({ centerId: center._id });
    await Coursework.deleteMany({ userId: center._id });

    await User.findByIdAndDelete(id);

    res
      .status(201)
      .json({ message: "تم حذف المركز وكل الحجوزات والدورات المرتبطة به" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

// Delete the image from Cloudinary
//  if (imageUrl) {
//   const publicId = imageUrl.split('/').pop().split('.')[0];
//   await cloudinary.uploader.destroy(publicId);
// }
module.exports = {
  getUser,
  getUsers,
  like,
  updatePhotoProfile,
  update,
  resetNotify,
  deleteCenter,
};
