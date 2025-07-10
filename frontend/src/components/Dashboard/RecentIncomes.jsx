import React from 'react'
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import NoDataMessage from '../Cards/NoDataMessage';
const RecentIncomes = ({transactions, onSeeMore}) => {
  return (
    <div className="card card-shadow-all">
        <div className="flex items-center justify-between">
            <h5 className="text-sm mb-2 md:text-lg mb-2">Recent Incomes</h5>
            <button className="card-btn mt-6" onClick= {onSeeMore}>See All</button>
        </div>
        {transactions.length ===0 ? (<NoDataMessage message = 'No Recent Expenses '/>):(
        <div className="">
            {
            transactions?.map((income, index) => (
                <TransactionInfoCard
                key = {income._id || index}
                title={income.source}
                icon={ income.icon}
                date = {moment(income.date).format("MMM DD, YYYY")}
                amount={income.amount}
                type="income"
                hideDeleteBtn={true}
                />
            ))}
        </div>
        )}
    </div>
  )
}

export default RecentIncomes
