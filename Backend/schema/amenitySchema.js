const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
    amenityId: {
        type: String,
        unique: true,
    },
    isChecked: {
        type: Boolean,
        default: false,
    },
    amenityName: String,
    amenityIcon: String,
    
})

module.exports = mongoose.model("Amenity", amenitySchema);