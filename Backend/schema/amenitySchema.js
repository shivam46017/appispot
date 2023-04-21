// import mongoose from "mongoose";
const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
    amenityId: {
        type: Number,
        unique: true,
    },
    amenityName: String,
    amenityIcon: String,
})

module.exports = mongoose.model("Amenity", amenitySchema);