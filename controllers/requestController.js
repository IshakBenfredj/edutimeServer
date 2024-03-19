// controllers/authenticationController.js

const uploadImage = require("../middlewares/uploadImage.js");
const Request = require("../models/Request.js");
const User = require("../models/User.js");

// إضافة طلب توثيق
const addRequest = async (req, res) => {
  try {
    const requestOld = await Request.findOne({
      userId: req.user._id,
      type: req.body.type,
    });
    if (requestOld) {
      return res.status(400).json({
        error: "لا يمكنك طلب التوثيق مرتين, إنتظر الرد من فريق العمل",
      });
    }
    const image = await uploadImage(req.body.image);
    const request = new Request({
      userId: req.user._id,
      image,
      type: req.body.type,
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

// حذف طلب توثيق
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);
    await deleteImage(request.image);
    await Request.findByIdAndDelete(id);

    res.status(200).json({ message: "تم حذف طلب التوثيق" });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

// قبول طلب توثيق
const acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );
    await User.findByIdAndUpdate(
      request.userId,
      { checkmark: true },
      { new: true }
    );
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

// رفض طلب توثيق
const refuseRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  addRequest,
  deleteRequest,
  acceptRequest,
  refuseRequest,
};
