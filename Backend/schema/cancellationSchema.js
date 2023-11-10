const mongoose = require('mongoose')

module.exports = mongoose.model('Cancellation', new mongoose.Schema({
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    approve: {
        type: Boolean,
        default: false
    },
    spotName: String,
    hostPhone: String,
    hostName: String,
    amt: Number,
    reason: String
}, {
    timestamps: true
}))


