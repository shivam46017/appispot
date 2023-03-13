const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")

const userSchema=new mongoose.Schema({
firstName:String,
lastName:String,
emailId:String,
password:String,
profilePic:String,
createdAt:Date,

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
})

// >> Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcryptjs.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("User", userSchema);