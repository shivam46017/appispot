const mongoose = require('mongoose');

const couponsSchema = new mongoose.Schema({

    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    couponType: {
        type: String,
        required: true
    },
    couponValue: {
        type: Number,
        required: true
    },
    couponMinOrder: {
        type: Number,
        required: true
    },
    couponMaxDiscount: {
        type: Number,
        required: true
    },
    couponExpiry: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Coupons', couponsSchema);