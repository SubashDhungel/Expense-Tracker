import React from "react";
import CustomTooltip from "./CustomTooltip"; // Adjust the import path as necessary
import CustomLegend from "./CustomLegend"; // Adjust the import path as necessary
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Customized
} from "recharts"; // Assuming you're using a library like react-minimal-pie-chart

const renderCustomText = ({ label, totalAmount }) => {
  return (
    <>
      <text
        x="50%"
        y="50%"
        dy={-25}
        textAnchor="middle"
        fill="#666"
        style={{ fontSize: "14px", fontWeight: "bold" }}
      >
        {label}
      </text>

      <text
        x="50%"
        y="50%"
        dy={8}
        textAnchor="middle"
        fill="#333"
        style={{ fontSize: "24px", fontWeight: "600" }}
      >
        {totalAmount}
      </text>
    </>
  );
};

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine = {false}
          // label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length] || "#8884d8"} // Fallback color
            />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content = {CustomLegend}/>
        {showTextAnchor && (
          <Customized
          

          component ={()=> renderCustomText({ label, totalAmount })}


          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
