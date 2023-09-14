const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  lister: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  coverImage: String,
  Images: [String],
  Name: String,
  Description: String,
  Amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
    },
  ],
  Categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  Location: {
    latitude: Number,
    longitude: Number,
    display_name: String,
    zipcode: Number,
    city: String,
    roadName: String,
    Country: String,
    State: String,
    address: String,
  },
  Type: String,
  Rules: Array,
  CancelPolicy: String,
  Price: Number,
  guests: Number,
  SqFt: Number,
  Timing: {
    Sunday: { open: String, close: String, holiday: Boolean },
    Monday: { open: String, close: String, holiday: Boolean },
    Tuesday: { open: String, close: String, holiday: Boolean },
    Wednesday: { open: String, close: String, holiday: Boolean },
    Thursday: { open: String, close: String, holiday: Boolean },
    Friday: { open: String, close: String, holiday: Boolean },
    Saturday: { open: String, close: String, holiday: Boolean },
  },
  BlockedTimings: [
    {
      start: String,
      end: String,
      date: String,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: [],
    },
  ],
  isApproved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Spot", spotSchema);
