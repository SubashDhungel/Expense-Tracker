import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
const CustomLineChart = ({ data }) => {
  const customTooltip = ({ active, payload }) => {
    console.log("Tooltip payload", payload);

    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 border border-gray-300  m-0 pl-6 pr-6">
          <p className="txt-xs font-semibold text-red-600 m-0 p-0">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600 mt-0 mb-0">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900 m-0 p-0">
              {" "}
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
  };
  return (
    <div className="">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.4} />
              <stop offset="95%" stopColor="red" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555", dy: 10, dx: 20  }}
            stroke="#ccc"
          />
          <YAxis
            dataKey="amount"
            tick={{ fontSize: 12, fill: "#555",  dx: -10  }}
            stroke="#ccc"
          />
          <Tooltip content={customTooltip} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="red"
            fillOpacity={1}
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "red" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
