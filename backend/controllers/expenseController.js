const Expense = require('../models/Expense');
const xlsx = require('xlsx');

// Add Expense category
exports.addExpense = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user   

    try {
        const { icon, category, amount, date } = req.body;
        // Validation
        if (!amount || !category || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        // Create new Expense record
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date
        });
        await newExpense.save();
        // Optionally, you can also update the user's Expense total or other related fields here


        res.status(200).json(newExpense);
    } catch (error) {
        console.error('Error adding Expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// get All Expense category

exports.getAllExpense = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching Expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
// Delete Expense category

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id; // Get Expense ID from request parameters
    try{
        const expense = await Expense.findByIdAndDelete(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
            }

            res.status(200).json({ message: 'Expense deleted successfully' });
            } catch (error) {
                console.error('Error deleting Expense:', error);
                res.status(500).json({ message: 'Server error' });
                }

    }


// Download Expense category Excel

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        if (expenses.length === 0) {
            return res.status(404).json({ message: 'No Expense records found' });
        }

        // Prepare Excel rows
        const data = expenses.map((expense) => ({
            Date: expense.date.toISOString().split('T')[0],
            Category: expense.category,
            Amount: expense.amount,
        }));

        // Add a total row at the end
        const totalAmount = data.reduce((sum, row) => sum + row.Amount, 0);
        data.push({
            Date: '',
            Category: 'Total',
            Amount: totalAmount,
        });

        // Create a worksheet
        const worksheet = xlsx.utils.json_to_sheet(data, {
            header: ['Date', 'Category', 'Amount']
        });

        // Auto-width for columns
        const columnWidths = [
            { wch: 12 },  // Date
            { wch: 25 },  // category
            { wch: 12 },  // Amount
        ];
        worksheet['!cols'] = columnWidths;

        // Create workbook and append the sheet
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Expense Report');

        // Create buffer
        const buffer = xlsx.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx'
        });

        // Set headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Expense_Report.xlsx');

        // Send the file
        res.status(200).send(buffer);

    } catch (error) {
        console.error('Error generating Expense Excel:', error);
        res.status(500).json({ message: 'Server error while generating Excel' });
    }
};
