const mongoose = require('mongoose');

module.exports =  mongoose.model("Chat", {
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    senderName: String,
    receiverName: String,
    message: {
        type: String,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
})
