const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
    amenityId: {
        type: String,
        unique: true,
    },
    amenityName: String,
    amenityIcon: String,
})

module.exports = mongoose.model("Amenity", amenitySchema);