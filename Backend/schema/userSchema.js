const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: { type: String, unique: true},
  password: String,
  profilePic: String,
  createdAt: Date,
  isActive:{type:Boolean,default:true},
  verified: {
    type: Boolean,
    default: false
  },
  notifications : {
    type: Array,
    default: []
  },
  chatId: {
    type: String,
    default: ''
   },
   queries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
   }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// >> Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
