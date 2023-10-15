const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const otp = mongoose.model('otp', otpSchema);
exports.module =  otp;