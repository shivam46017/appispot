const mongoose = require('mongoose')

module.exports = mongoose.model('Refund', new mongoose.Schema({
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
}))