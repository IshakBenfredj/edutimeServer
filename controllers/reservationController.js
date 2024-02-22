const { sendMailPayment } = require("../middlewares/nodemailer.js");
const Coursework = require("../models/Coursework.js");
const Reservation = require("../models/Reservation.js");
const User = require("../models/User.js");

const addReservation = async (req, res) => {
  try {
    const reservation = req.body;
    const { id } = req.params;
    const reservationExist = await Reservation.find({
      courseworkId: id,
      reservator: req.user._id,
    });
    console.log(reservationExist.length);
    if (reservationExist.length !== 0) {
      return res.status(500).json({
        error:
          "سبق لك الحجز في هذه الدورة , قم بحذف حجزك القديم في حال أردت إعادة الحجز",
      });
    }

    const course = await Coursework.findById(id);
    reservation.courseworkId = id;
    reservation.centerId = course.userId;
    reservation.reservator = req.user._id;
    const user = await User.findById(course.userId);
    user.notifyCount = user.notifyCount + 1;
    await Reservation.create(reservation);
    await user.save();
    res.status(201).json({ message: "تم إرسال الحجز بنجاح" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

const getReservations = async (req, res) => {
  try {
    const allReservations = await Reservation.find();
    const reservations = allReservations.reverse();

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

const accpetRefuseRes = async (req, res) => {
  try {
    const { id, userId, courseworkId } = req.body;
    const { etat } = req.params;
    const reservation = await Reservation.findById(id);
    const coursework = await Coursework.findById(courseworkId);

    reservation.etat = etat;
    await reservation.save();

    async function sendPaymentConfirmationEmail() {
      try {
        const user = await User.findById(userId);

        const titleAcc = "قبول طلب الحجز";
        const titleRef = "رفض طلب الحجز";

        const messageAcc = `
                    يسرنا أن نعلمك أنه قد تم قبول طلب الحجز الخاص بك في دورة <b>${coursework.name}</b>
                `;
        const messageRef = `
                    يؤسفنا أن نعلمك أنه قد تم رفض طلب الدفع الخاص بك في دورة <b>${coursework.name}</b> يمكنك الاتصال للاستفسار اكثر
                `;

        if (etat === "accept") {
          await sendMailPayment(user.email, titleAcc, messageAcc);
          res.status(201).json({ message: "تم قبول الحجز" });
        } else {
          await sendMailPayment(user.email, titleRef, messageRef);
          res.status(201).json({ message: "تم رفض الحجز" });
        }

        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    await sendPaymentConfirmationEmail();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ بالسيرفر" });
  }
};

module.exports = {
  addReservation,
  getReservations,
  deleteReservation,
  accpetRefuseRes,
};
