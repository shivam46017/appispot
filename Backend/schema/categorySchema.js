import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId: Number,
    categoryName: String,
    categoryIcon: String,
})

module.exports = mongoose.model("Category", categorySchema);