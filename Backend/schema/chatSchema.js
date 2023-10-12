const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot",
  },
  inquirer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      message: String,
      date: {
        type: Date,
        default: Date.now(),
      },
      by: String
    },
  ],
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
