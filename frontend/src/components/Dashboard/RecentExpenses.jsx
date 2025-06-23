import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card-shadow-all card">
      <div className="flex items-center justify-between">
        <h5 className="text-sm mb-2 md:text-lg">Recent Expenses</h5>
        <button className="card-btn mt-6" onClick={onSeeMore}>
          See All
          {/* <LuArrowRight className="text-base" /> */}
        </button>
      </div>
      <div className="">
        {transactions?.slice(0,5).map((expense, index) => (
          <TransactionInfoCard
            key = {expense._id || index}
            title={expense.category}
            icon={ expense.icon}
            date = {moment(expense.date).format("MMM DD, YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
