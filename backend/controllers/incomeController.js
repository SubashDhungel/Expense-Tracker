const Income = require('../models/Income');
const User = require('../models/User');

// Add Income source
exports.addIncome = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user   

    try {
        const { icon, source, amount, date } = req.body;
        // Validation
        if (!amount || !source || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        // Create new income record
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date
        });
        await newIncome.save();
        // Optionally, you can also update the user's income total or other related fields here


        res.status(200).json(newIncome);
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// get All Income source

exports.getAllIncome = async (req, res) => {

}
// Delete Income source

exports.deleteIncome = async (req, res) => {

}
// Delete Income source

exports.downloadIncomeExcel = async (req, res) => {

}