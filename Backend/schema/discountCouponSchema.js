const mongoose = require('mongoose');

module.exports =  mongoose.model("CouponNdiscount", {
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    venueIds:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Spot',
        required: true
    },
    couponType: {
        type: String,
    },
    MinOrder: {
        type: Number,
    },
    Price: {
        type: Number,
        required: true
    },
    Code:{
        type: String,
        required: true,
        unique: true
    },
    Description:{
        type: String,
    },
    StartDate:{
        type: Date,
        default: Date.now
    },
    EndDate:{
        type: Date,
    },
})
