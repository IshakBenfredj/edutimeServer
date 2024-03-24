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

    if (!conversation) {
      const newConv = new Conversation({
        members: [req.user._id, req.body.id],
      });
      const conversation = await newConv.save();
      const newMessage = new Message({
        conversationId: conversation._id,
        sender: req.user._id,
        text: req.body.text,
      });

      const message = await newMessage.save();
      res.status(200).json({ conversation, message });
    } else {
      const newMessage = new Message({
        conversationId: conversation._id,
        sender: req.user._id,
        text: req.body.text,
      });

      const message = await newMessage.save();
      res.status(200).json({ message, conversation });
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

router.put(
  "/length/:conversationId/:senderId",
  requireAuth,
  async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
        sender: req.params.senderId,
        isNewMessage: true,
      });

      const isNewTrueCount = messages.length;

      res.status(200).json(isNewTrueCount);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put("/:conversationId/:senderId", requireAuth, async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const senderId = req.params.senderId;

    const messages = await Message.find({
      conversationId,
      sender: senderId,
      isNewMessage: true,
    });

    for (const message of messages) {
      message.isNewMessage = false;
      await message.save();
    }

    res
      .status(200)
      .json({ message: "isNew set to false for all relevant messages." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "done" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
