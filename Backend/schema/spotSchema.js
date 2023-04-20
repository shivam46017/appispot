const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema({
    createdAt:{type: Date, default: Date.now},
    coverImage:String,
    Images:[String],
    Name:String,
    Describtion:String,
    Amenities:[String],
    Categories:[String],
    Location:String,
    Type:String,
    Rules:String,
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