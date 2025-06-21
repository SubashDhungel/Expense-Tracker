import React from 'react'
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { LuDownload } from "react-icons/lu";
const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className=" card card-shadow-all">

        <div className="flex items-center justify-between">
            <h5 className="text-lg mb-2">Recent Incomes</h5>
            <button className="card-btn mt-6" onClick= {onDownload}> <LuDownload className='text-base z-index-900'></LuDownload> Download</button>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2  gap-4">
            {
            transactions?.map((income, index) => (
                <TransactionInfoCard
                key = {income._id || index}
                title={income.source}
                icon={income.icon}
                date = {moment(income.date).format("MMM DD, YYYY")}
                amount={income.amount}
                type="income"
                onDelete = {() => onDelete(income._id)}
                hideDeleteBtn={false}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList
