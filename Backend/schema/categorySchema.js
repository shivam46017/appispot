const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
    },
    isChecked: {
        type: Boolean,
        default: false,
    },
    categoryName: String,
    categoryIcon: String,
})

module.exports = mongoose.model("Category", categorySchema);