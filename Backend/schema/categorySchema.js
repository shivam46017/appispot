const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        unique: true,
    },
    categoryName: String,
    categoryIcon: String,
})

module.exports = mongoose.model("Category", categorySchema);