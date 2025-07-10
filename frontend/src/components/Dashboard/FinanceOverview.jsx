import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import {rgbToHex} from "../../utils/helper";
import NoDataMessage from "../Cards/NoDataMessage";

const FinanceOverview = ({
  grossAmount,
  totalIncome,
  totalExpense

}) => {
  const colorPrimary = rgbToHex(0,0,230);
  const colorGreen = rgbToHex(39,170,6);
  const colorDanger = rgbToHex(206,5,5);
const COLORS = [colorPrimary,colorGreen, colorDanger];


  const balanceData=[
    {name: "Gross Amount", amount: grossAmount},
    {name: "Total Income",amount: totalIncome},
    {name: "Total Expense",amount: totalExpense},
  ] 

  return <div className= "card-shadow-all card mt-5"> 
  <div className="flex items-center justify-between">
    <h5 className="text-sm mb-2 md:text-lg">Financial Overview</h5>
  </div>
  {!grossAmount ? (<NoDataMessage message=' No Financial Data'/>):(
  <CustomPieChart
  data={balanceData}
  label="Total Balance"
  totalAmount = {grossAmount}
  colors={COLORS}
  showTextAnchor = {false}
  >

  </CustomPieChart>)}
  </div>;
};

export default FinanceOverview;
