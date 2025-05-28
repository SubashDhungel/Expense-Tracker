const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon:{
        type: String,
        required: true,
    },
    source: {
        type: String,  // e.g., salary, business, etc.
        required: true
    },
     amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Income', IncomeSchema);