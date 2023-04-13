const mongoose = require("mongoose");


const spotSchema = new mongoose.Schema({
    createdAt:String,
    coverImage:String,
    spotImages:[],
    spotName:String,
    spotDescribtion:String,
    spotAmenities:[],
    spotCategory:[],
    spotLocation:String,
    spotType:String,
    spotRules:String,
    spotCancel:String,
    spotPrice:Number,
    spotMinGuest:Number,
    spotTiming:String

});
module.exports = mongoose.model("Spot", spotSchema);