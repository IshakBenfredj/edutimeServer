const { sendMailPayment } = require("../middlewares/nodemailer.js");
const Course = require("../models/Course.js");
const Reservation = require("../models/Reservation.js");

const addReservation = async (req, res) => {
  try {
    const reservationExist = await Reservation.findOne({
      courseId: req.body.courseId,
      client: req.user._id,
    });
    if (reservationExist) {
      return res.status(500).json({
        error:
          "سبق لك الحجز في هذه الدورة , قم بحذف حجزك القديم في حال أردت إعادة الحجز",
      });
    }

    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return res.status(404).json({
        error: "هذا الإعلان محذوف أو غير موجود",
      });
    }
    const reservation = new Reservation({
      userId: course.userId,
      client: req.user._id,
      ...req.body,
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getClientReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ client: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(201).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(201).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(201).json({ message: "تم حذف الحجز" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const accpetRes = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    reservation.isAccept = true;
    await reservation.save();
    res.status(200).json(reservation);
    // async function sendPaymentConfirmationEmail() {
    //   try {
    //     const user = await User.findById(userId);

    // const titleAcc = "قبول طلب الحجز";
    // const titleRef = "رفض طلب الحجز";

    // const messageAcc = `
    //             يسرنا أن نعلمك أنه قد تم قبول طلب الحجز الخاص بك في دورة <b>${course.name}</b>
    //         `;
    // const messageRef = `
    //             يؤسفنا أن نعلمك أنه قد تم رفض طلب الدفع الخاص بك في دورة <b>${course.name}</b> يمكنك الاتصال للاستفسار اكثر
    //         `;

    // await sendMailPayment(user.email, titleAcc, messageAcc);
    //       res.status(201).json({ message: "تم قبول الحجز" });

    // console.log("Email sent successfully");
    //   } catch (error) {
    //     console.error("Error sending email:", error);
    //   }
    // }

    // await sendPaymentConfirmationEmail();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addReservation,
  getClientReservations,
  getUserReservations,
  deleteReservation,
  accpetRes,
};
