import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema({
    amenityId: Number,
    amenityName: String,
    amenityIcon: String,
})

module.exports = mongoose.model("Amenity", amenitySchema);