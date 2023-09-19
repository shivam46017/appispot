import mongoose from 'mongoose';

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
export default otp;