// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    spotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientName: String,
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);