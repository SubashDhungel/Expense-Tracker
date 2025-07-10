import React from 'react'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { LuDownload } from "react-icons/lu";
import NoDataMessage from '../Cards/NoDataMessage';
const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className="card-shadow-all card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg mb-2">Expenses</h5>
            <button className="card-btn mt-6" onClick= {onDownload}> <LuDownload className='text-base z-index-900'></LuDownload> Download</button>
        </div>
        {transactions.length === 0 ? (<NoDataMessage message = ' No Recent Expenses' />):(
        <div className=" grid grid-cols-1 md:grid-cols-2  md:gap-4">
            {
            transactions?.map((expense, index) => (
                <TransactionInfoCard
                key = {expense._id || index}
                title={expense.category}
                icon={expense.icon}
                date = {moment(expense.date).format("MMM DD, YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete = {() => onDelete(expense._id)}
                hideDeleteBtn={false}
                />
            ))}
        </div>
        )}
    </div>
  )
}

export default ExpenseList
