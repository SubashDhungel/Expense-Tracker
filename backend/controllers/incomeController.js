const Income = require('../models/Income');
const xlsx = require('xlsx');
// const User = require('../models/User');

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
    const userId = req.user._id; // Assuming user ID is available in req.user
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
// Delete Income source

exports.deleteIncome = async (req, res) => {
    const incomeId = req.params.id; // Get income ID from request parameters
    try{
        const income = await Income.findByIdAndDelete(incomeId);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
            }

            res.status(200).json({ message: 'Income deleted successfully' });
            } catch (error) {
                console.error('Error deleting income:', error);
                res.status(500).json({ message: 'Server error' });
                }

    }


// Download Income source Excel

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        if (incomes.length === 0) {
            return res.status(404).json({ message: 'No income records found' });
        }

        // Prepare Excel rows
        const data = incomes.map((income) => ({
            Date: income.date.toISOString().split('T')[0],
            Source: income.source,
            Amount: income.amount,
            Icon: income.icon,
        }));

        // Add a total row at the end
        const totalAmount = data.reduce((sum, row) => sum + row.Amount, 0);
        data.push({
            Date: '',
            Source: 'Total',
            Amount: totalAmount,
            Icon: '',
        });

        // Create a worksheet
        const worksheet = xlsx.utils.json_to_sheet(data, {
            header: ['Date', 'Source', 'Amount', 'Icon']
        });

        // Auto-width for columns
        const columnWidths = [
            { wch: 12 },  // Date
            { wch: 25 },  // Source
            { wch: 12 },  // Amount
            { wch: 10 },  // Icon
        ];
        worksheet['!cols'] = columnWidths;

        // Create workbook and append the sheet
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Income Report');

        // Create buffer
        const buffer = xlsx.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx'
        });

        // Set headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Income_Report.xlsx');

        // Send the file
        res.status(200).send(buffer);

    } catch (error) {
        console.error('Error generating income Excel:', error);
        res.status(500).json({ message: 'Server error while generating Excel' });
    }
};
