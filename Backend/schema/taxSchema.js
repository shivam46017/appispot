const mongoose = require('mongoose')

const taxSchema = new mongoose.Schema({
    state: String,
    cities: [{
        name: String,
        serviceFee: Number,
        taxRate: Number
    }]
})

const Tax = mongoose.model('Tax', taxSchema)

module.exports = Tax