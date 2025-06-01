const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    icon: {
        type: String,
        required: true
    },
    category: {  // Food, rent, Groceries
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: { // Date of the expense
        type: Date,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);