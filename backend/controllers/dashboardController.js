const Income = require('../models/Income'); //  Income model 
const Expense = require('../models/Expense'); //  Expense model 

const { isValidObjectId, Types } = require('mongoose');


// Get dashboard data
exports.getDashboardData = async (req, res) => {

    try {
        const userId = req.user?._id; // Assuming user ID is available in req.user

        // 1️Validate user ID
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const userObjectId = new Types.ObjectId(String(userId)); // queries using aggregation expect the exact data type match,


        // Run all DB operations in parallel for better performance
        const [totalIncomeResult, totalExpensesResult, incomes, expenses, last5transactions] = await Promise.all([

            // 1. Aggregation for total income
            Income.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]),

            // 2. Aggregation for total expenses
            Expense.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]),

            // 3. Get last 60 days income transactions (sorted latest first)
            Income.find({
                userId: userObjectId,
                date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
            }).sort({ date: -1 }),

            // 4. Get last 30 days expense transactions (sorted latest first)
            Expense.find({
                userId: userObjectId
                ,
                date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
            }).sort({ date: -1 }),

            // 5. Last 5 transactions from both income and expense (combined & sorted)
            (async () => {
                const lastIncomes = (await Income.find({ userId: userObjectId })
                    .sort({ date: -1 })
                    .limit(5))
                    .map((txn) => ({
                        ...txn.toObject(),
                        type: 'income'
                    }));

                const lastExpenses = (await Expense.find({ userId: userObjectId })
                    .sort({ date: -1 })
                    .limit(5))
                    .map((txn) => ({
                        ...txn.toObject(),
                        type: 'expense'
                    }));

                return [...lastIncomes, ...lastExpenses].sort((a, b) => b.date - a.date);
            })()
        ]);

        // Calculate totals

        const totalIncomeAmt = totalIncomeResult[0]?.total || 0;
        const totalExpenseAmt = totalExpensesResult[0]?.total || 0;
        const grossAmt = totalIncomeAmt - totalExpenseAmt;
        const last60daysIncomeAmount = incomes.reduce((sum, income) => sum + income.amount, 0);
        const last30daysExpenseAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // Respond
        res.status(200).json({
            grossAmt,
            expenses,
            totalIncomeAmt,
            totalExpenseAmt,
            last60days:{
                totalIncome: last60daysIncomeAmount,
                transactions: incomes
            },
            last30days:{
                totalExpense: last30daysExpenseAmount,
                transactions:expenses

            },
            recentTransactions: last5transactions
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};