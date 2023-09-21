import Offer from "../models/Offers.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Coursework from "../models/Coursework.js";
import { sendMailPayment } from "../middlewares/nodemailer.js";

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { selectedCourses, selectedOffer } = req.body;

    // Ensure selectedCourses is an array, even if it's a string
    const coursesArray = Array.isArray(selectedCourses) ? selectedCourses : [selectedCourses];

    const uploadedFile = req.file;

    const offer = await Offer.find();
    const offerType = offer[0][selectedOffer];
    const amount = offerType * coursesArray.length;
    console.log(amount);

    const payment = new Payment({
      userId: req.user._id,
      courses: coursesArray,
      image: uploadedFile.filename,
      paymentType: selectedOffer,
      amount,
    });

    await payment.save();

    res.status(201).json({ message: "تم إرسال الدفع" });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "server error" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user.type === 'admin') {
      const allPayments = await Payment.find();
      const payments = allPayments.reverse()

      res.status(201).json(payments);
    }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'خطأ بالسيرفر' });
  }
};

export const accept = async (req, res) => {
  try {
    const item = req.body;
    const payment = await Payment.findById(item._id);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    const updateCoursePromises = item.courses.map(async (courseId) => {
      const course = await Coursework.findById(courseId);

      if (course) {
        course.activation = true;

        let offerDurationMonths;

        switch (item.paymentType) {
          case 'month':
            offerDurationMonths = 1;
            break;
          case 'sixMonths':
            offerDurationMonths = 6;
            break;
          case 'year':
            offerDurationMonths = 12;
            break;
        }

        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + offerDurationMonths);
        course.activationDate = currentDate;

        await course.save();
      }
    });

    await Promise.all(updateCoursePromises);    
    await Payment.findByIdAndDelete(item._id);

  async function sendPaymentConfirmationEmail(item) {
    try {
      const user = await User.findById(item.userId);
      
      // Use Promise.all to fetch courses asynchronously
      const coursePromises = item.courses.map(async (courseId) => {
        const course = await Coursework.findById(courseId);
        return course;
      });
      
      const courses = await Promise.all(coursePromises);
      function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-AR', options);
      }

      const title = 'قبول طلب التفعيل';
      
      const message = `
        يسرنا أن نعلمك أنه قد تم قبول طلب الدفع الخاص بك من أجل تفعيل الدورات التالية:
        <ul>
          ${courses.map((e) => `
            <li key="${e._id}">
              ${e.name}
            </li>
          `).join('')}
        </ul>
        حيث تنتهي فترة الإشتراك بتاريخ ${formatDate(courses[0].activationDate)}
      `;

      // Assuming sendMailPayment is a function that sends the email
      await sendMailPayment(user.email, title, message);

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  sendPaymentConfirmationEmail(item);

    res.status(201).json({ message: 'تم تفعيل الدورات' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'خطأ بالسيرفر' });
  }
};

export const refuse = async (req, res) => {
  try {
    const { item, cause } = req.body;
    const payment = await Payment.findById(item._id);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    payment.seeit = true;
    payment.etat = false;
    await payment.save();


  async function sendPaymentConfirmationEmail(item) {
    try {      
      // Use Promise.all to fetch courses asynchronously
      const user = await User.findById(item.userId);
      const admin = await User.find({type: "admin"});

      const coursePromises = item.courses.map(async (courseId) => {
        const course = await Coursework.findById(courseId);
        return course;
      });
      
      const courses = await Promise.all(coursePromises);

      const title = 'رفض طلب التفعيل';
      
      const message = `
        يؤسفنا أن نعلمك أنه قد تم رفض طلب الدفع الخاص بك من أجل تفعيل الدورات التالية:
        <ul>
          ${courses.map((e) => `
            <li key="${e._id}">
              ${e.name}
            </li>
          `).join('')}
        </ul>
          والسبب متمثل في : <p style='color: red; font-weight: bold;'>${cause}</p>
          لمزيد من الإستفسار يمكنك الإتصال بنا على الرقم <a href='tel:${admin[0].phone}'>${admin[0].phone}</a>
      `;

      // Assuming sendMailPayment is a function that sends the email
      await sendMailPayment(user.email, title, message);

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  sendPaymentConfirmationEmail(item);


    res.status(201).json({ message: 'تم رفض الطلب' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'خطأ بالسيرفر' });
  }
};