const mongoose = require('mongoose');

module.exports =  mongoose.model("Coupon", {
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
