const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const sellerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: { type: String, unique: true},
  password: String,
  profilePic: String,
  createdAt: Date,
  isActive:{type:Boolean,default:true}
});

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// >> Compare Password

sellerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("Seller", sellerSchema);