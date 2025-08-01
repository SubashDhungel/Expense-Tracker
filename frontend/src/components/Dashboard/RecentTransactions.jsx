import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import NoDataMessage from "../Cards/NoDataMessage";

const RecentTransactions = ({ transaction, onSeeMore }) => {
  return (
    <div className="card-shadow-all card mt-5  ">
      <div className="flex items-center justify-between">
        <h5 className="text-sm mb-2 md:text-lg">Recent Transactions</h5>
        <button className="card-btn mt-6" onClick={onSeeMore}>
          See All
          {/* <LuArrowRight className="text-base" /> */}
        </button>
      </div>
      {transaction.length === 0?(<NoDataMessage message='No Recent Transactions'></NoDataMessage>):(
      <div className="">
        {transaction?.slice(0, 4).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "income" ? item.source : item.category}
            icon={item.icon}
            amount={item.amount}
            date={moment(item.date).format("MMM DD, YYYY")}
            type={item.type}
            hideDeleteBtn={true}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default RecentTransactions;
