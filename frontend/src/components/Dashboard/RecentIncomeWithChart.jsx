import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
const COLORS = ["#875cf5", "#fa2c37", "#Ff6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = React.useState([]);

  const prepareChartData = (data) => {
    const dataArr = data?.map((item) => ({
      name: item?.source || "",
      amount: item?.amount || 0,
    }));
    setChartData(dataArr);
  };

  React.useEffect(() => {
    prepareChartData(data);
    return () => {
      // setChartData([]);
    };
  }, [data]);

  return (
    <div className="card-shadow-all card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        colors={COLORS}
        showTextAnchor = {true}
      ></CustomPieChart>
    </div>
  );
};

export default RecentIncomeWithChart;
