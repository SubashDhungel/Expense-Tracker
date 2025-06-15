import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transaction, onSeeMore }) => {
  return (
    <div className="card-shadow-all card  ">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All
          <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transaction?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "income" ? item.source : item.category}
            icon=""
            amount={item.amount}
            date={moment(item.date).format("MMM DD, YYYY")}
            type={item.type}
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
