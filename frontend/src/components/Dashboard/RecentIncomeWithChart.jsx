import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
const COLORS = [
  "#026440", // Dark green (new first)
  "#038C3E", // Medium-dark green
  "#28A745", // Classic green
  "#6FCF97", // Light green
  "#A8E6A3", // Lighter green
  "#C1F0C1"  // Very light green
];


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
        <h5 className="text-sm mb-2 md:text-lg">Last 60 Days Income</h5>
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
