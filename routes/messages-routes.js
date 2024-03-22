const router = require("express").Router();
const Message = require("../models/Message.js");
const Conversation = require("../models/Conversation.js");
const requireAuth = require("../middlewares/requireAuth.js");

//add

router.post("/fromProfile", requireAuth, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.user._id, req.body.id] },
    });

    if (conversation) {
      const newMessage = new Message({
        conversationId: conversation._id,
        sender: req.user._id,
        text: req.body.text,
      });

      const savedMessage = await newMessage.save();
      res.status(200).json({ message: "تم إرسال الرسالة" });
    } else {
      const newConv = new Conversation({
        members: [req.user._id, req.body.id],
      });
      const savedConv = await newConv.save();
      const newMessage = new Message({
        conversationId: savedConv._id,
        sender: req.user._id,
        text: req.body.text,
      });

      const savedMessage = await newMessage.save();
      res.status(200).json({ message: "تم إرسال الرسالة" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", requireAuth, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
