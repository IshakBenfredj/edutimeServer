const { uploadImage, deleteImage } = require("../middlewares/uploadImage.js");
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
        error: "لا يمكنك الطلب مرتين, إنتظر الرد من فريق العمل",
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

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(201).json(requests);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndDelete(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    const user = await User.findById(request.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.isCenter) {
      user.checkmark = true;
    } else {
      user.isCenter = true;
    }
    await user.save();
    await deleteImage(request.image);
    res.status(200).json({ message: "done" });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const refuseRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndDelete(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    await deleteImage(request.image);
    res.status(200).json({ message: "done" });
  } catch (error) {
    console.error("Error refusing request:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addRequest,
  getRequests,
  acceptRequest,
  refuseRequest,
};
