const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

//new conv

router.post("/", requireAuth, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const conversation = await newConversation.save();
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", requireAuth, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ conversationId: req.params.id });
    res.status(200).json({ message: "تم الحذف" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new_conversations/:id", requireAuth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    });

    let newConversationCount = 0;

    for (const conversation of conversations) {
      const newMessage = await Message.findOne({
        conversationId: conversation._id,
        sender: { $ne: req.params.id },
        isNewMessage: true,
      });

      if (newMessage) {
        newConversationCount++;
      }
    }

    res.json(newConversationCount);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
