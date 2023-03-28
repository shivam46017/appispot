const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");


const bannerSchema = new mongoose.Schema({
    createdAt:Date,
    coverImage:String
});
module.exports = mongoose.model("Banner", bannerSchema);