const mongoose = require('mongoose')

const payoutSchema = new mongoose.Schema({
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    refund: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Refund'
    },
    amt: Number,
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Payouts = mongoose.model('Payout', payoutSchema)
export default Payouts