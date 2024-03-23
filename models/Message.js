const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    isNewMessage: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
