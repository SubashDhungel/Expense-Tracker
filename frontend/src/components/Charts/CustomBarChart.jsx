import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";


const CustomBarChart = ({ data }) => {

  const [interval, setInterval] = React.useState(9); // Default interval for XAxis ticks

  React.useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1280) setInterval(4); // big screen
    else if (width >= 768) setInterval(6); // medium
    else setInterval(9); // small
  };

  handleResize(); // set initially
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // Function to get color based on index
  const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "cfbefb");

  const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-2 border border-gray-300 m-0 pl-6 pr-6" >
        <p className="txt-xs font-semibold text-purple-800 m-0 p-0">{label}</p>
        <p className="text-sm font-medium text-gray-900 m-0 p-0">Rs {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#555", dy:15, dx:20 }}
            stroke="#ccc"
            interval={interval}
            // angle={-45}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" , dx:-10}} stroke="#ccc" />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#ff8042"
            radius={[0, 0, 0, 0]}
            activeData={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
