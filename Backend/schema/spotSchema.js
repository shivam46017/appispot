const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema({
    createdAt:{type: Date, default: Date.now},
    lister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    coverImage:String,
    Images:[String],
    Name:String,
    Description:String,
    Amenities:Array,
    Categories:Array,
    Location:String,
    Type:String,
    Rules:Array,
    CancelPolicy:String,
    Price:Number,
    MinGuest:Number,
    Timing: {
        Sunday: { open: String, close: String },
        Monday: { open: String, close: String },
        Tuesday: { open: String, close: String },
        Wednesday: { open: String, close: String },
        Thursday: { open: String, close: String },
        Friday: { open: String, close: String },
        Saturday: { open: String, close: String },
      },

});
module.exports = mongoose.model("Spot", spotSchema);