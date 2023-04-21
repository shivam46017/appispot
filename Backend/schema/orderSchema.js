const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  spotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spot',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  maxGuest: {
    type: Number,
    required: true
  },
  priceSpot: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
