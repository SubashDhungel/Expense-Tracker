const express = require('express');
const router = express.Router();
const {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel} = require('../controllers/expenseController');
const {protect} = require('../middleware/authMiddleware');

router.post('/add', protect, addExpense);
router.get('/getAll', protect, getAllExpense);
router.delete('/delete/:id', protect, deleteExpense);
router.get('/download-excel', protect, downloadExpenseExcel);

module.exports = router;