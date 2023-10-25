const mongoose = require('mongoose')

const refundSchema = new mongoose.Schema({
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amtRequested: Number,
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Refund = mongoose.model('Refund', refundSchema)
module.exports = Refund