const mongoose = require('mongoose');

// Create a new schema
const SupportSchema = new mongoose.Schema({
    srno: String,
    bookingId: String,
    issue: String,
    note: String,
    screenshots: [String],
    from: {
        id: String,
        role: String
    },
    resolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Use pre middleware to assign srno before saving
SupportSchema.pre('save', function(next) {
    // 'this' refers to the document
    if(!this.srno) {
        this.model('Support').countDocuments((err, count) => {
            if(err) {
                console.error(err);
                next(err);
            } else {
                // Add leading zeros and prefix 'SR' only if count is less than 3 digits
                this.srno = 'SR' + ((count + 1) < 1000 ? (count + 1).toString().padStart(3, '0') : (count + 1).toString());
                next();
            }
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('Support', SupportSchema);
