const { sendMailPayment } = require("../middlewares/nodemailer.js");
const uploadImage = require("../middlewares/uploadImage.js");
const Course = require("../models/Course.js");
const Reservation = require("../models/Reservation.js");
const User = require("../models/User.js");
const cloudinary = require("cloudinary").v2;

const addCourse = async (req, res) => {
  try {
    const url = await uploadImage(req.body.image);
    const course = new Course({
      userId: req.user._id,
      image: url,
      ...req.body,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    const courses = allCourses.reverse();

    res.status(201).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "course doesn't exist" });
    }

    return res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
  }
};

const like = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(courseId);
    const userIndex = course.likes.indexOf(req.user._id);

    if (userIndex === -1) {
      course.likes.push(req.user._id);
    } else {
      course.likes.splice(userIndex, 1);
    }

    await course.save();
    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ error: "إعلان غير موجود" });
    }

    if (data.image && data.image !== course.image) {
      const publicId = course.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
      const url = await uploadImage(data.image);
      course = { ...data, userId: req.user._id, image: url };
    } else {
      course = { ...data, userId: req.user._id };
    }

    await Course.findByIdAndUpdate(id, course);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    // await Reservation.deleteMany({ courseId: course._id });

    // await Course.findByIdAndDelete(id);

    res
      .status(201)
      .json({ message: "تم حذف الدورة وكل الحجوزات المرتبطة بها" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addCourse,
  getCourses,
  getCourse,
  like,
  updateCourse,
  deleteCourse,
};
