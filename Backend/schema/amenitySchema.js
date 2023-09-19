const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
    isChecked: {
        type: Boolean,
        default: false,
    },
    amenityName: String,
    amenityIcon: String,
    
})

module.exports = mongoose.model("Amenity", amenitySchema);