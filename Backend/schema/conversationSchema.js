const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const ConversationSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  senderName: String,
  receiverName: String,
   message: [{
    
  }],
    timestamps: {
         String
    }}
);

module.exports = mongoose.model("Conversation", ConversationSchema);