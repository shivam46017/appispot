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
    type: {
      startDate: String,
      endDate: String
    },
    required: true
  },
  time: {
    type: {
      startTime: String,
      endTime: String
    },
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
  transactionDetails: {
    type: {
      transactionId: String,
      transactionStatus: String,
      transactionDate: Date
    },
    required: true
  },
  // Added a new field for serialized number
  serialNo: {
    type: String,
    unique: true
  },
  bookingId: {
    type: String,
    unique: true
  }
}, { timestamps: true });

orderSchema.statics.getNextSerialNo = async function() {
  const maxSerialNo = await this.findOne().sort('-serialNo').select('serialNo').lean();
  if (!maxSerialNo) return '0001';
  const nextSerialNo = (parseInt(maxSerialNo.serialNo) + 1).toString().padStart(4, '0');
  return nextSerialNo;
};

orderSchema.statics.getNextBookingId = async function() {
  const maxBookingId = await this.findOne().sort('-bookingId').select('bookingId').lean();
  if (!maxBookingId) return '0001';
  const nextSerialNo = (parseInt(maxBookingId.bookingId) + 1).toString().padStart(4, '0');
  return nextSerialNo;
};


orderSchema.pre('save', async function(next) {
  const serialNo = await this.constructor.getNextSerialNo();
  const bookingNo = await this.constructor.getNextBookingId();
  this.serialNo = serialNo;
  this.bookingId = bookingNo
  next();
});

module.exports = mongoose.model('Order', orderSchema);
