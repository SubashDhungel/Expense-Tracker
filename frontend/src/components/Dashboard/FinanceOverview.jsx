import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
const COLORS = ["#8C04AD","#069015","#d42c08"];

const FinanceOverview = ({
  grossAmount,
  totalIncome,
  totalExpense

}) => {

  const balanceData=[
    {name: "Gross Amount", amount: grossAmount},
    {name: "Total Income",amount: totalIncome},
    {name: "Total Expense",amount: totalExpense},
  ] 

  return <div className= "card-shadow-all card mt-5"> 
  <div className="flex items-center justify-between">
    <h5 className="text-lg">Financial Overview</h5>
  </div>
  <CustomPieChart
  data={balanceData}
  label="Total Balance"
  totalAmount = {grossAmount}
  colors={COLORS}
  showTextAnchor = {false}
  >

  </CustomPieChart>
  </div>;
};

export default FinanceOverview;
