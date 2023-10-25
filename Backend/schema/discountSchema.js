const mongoose = require('mongoose');

module.exports =  mongoose.model("Discount", {
    venueCategory:{
        type: String,
        default: "",
    },
    venuesIds: {
        type: Array,
        default: [],
        optional: true,
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
    Description:{
        type: String,
        optional: true,
    },
    StartDate:{
        type: Date,
        default: Date.now
    },
    EndDate:{
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Selller'
    }
})
