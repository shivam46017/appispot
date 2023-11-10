const mongoose = require("mongoose");
const sellerSchema = require("./sellerSchema");
const userSchema = require("./userSchema");

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
  admin: Boolean,
  messages: [
    {
      message: String,
      date: {
        type: Date,
        default: Date.now(),
      },
      by: String
    }
  ],
}, { timestamps: true });

chatSchema.pre('save', async function(next) {
  const sellers = await sellerSchema.findById(this.respondent._id.toString())
  sellers.queries.push(this._id.toString())
  await sellers.save()
  next();
});

chatSchema.pre('save', async function(next) {
  const user = await userSchema.findById(this.inquirer._id)
  user.queries.push(this._id)
  await user.save()
})

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
