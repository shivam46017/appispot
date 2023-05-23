// const mongoose = require('mongoose');

// const couponsSchema = new mongoose.Schema({

//     couponCode: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     couponType: {
//         type: String,
//         required: true
//     },
//     couponValue: {
//         type: Number,
//         required: true
//     },
//     couponMinOrder: {
//         type: Number,
//         required: true
//     },
//     couponMaxDiscount: {
//         type: Number,
//         required: true
//     },
//     couponExpiry: {
//         type: Date,
//         required: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Coupons', couponsSchema);


// // couponsSchema.create({
// //   couponCode: "NEW50",
// //   couponMaxDiscount: 50,
// //   couponValue: 10,
// //   couponType: "percent",
// //   couponMinOrder: 200,
// //   couponExpiry: "2021-12-31T00:00:00.000+00:00",
// // })
