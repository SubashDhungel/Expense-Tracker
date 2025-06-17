import React from 'react'

const CustomBarDiagramTooltip = ({ active, payload, label }) => {
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

export default CustomBarDiagramTooltip
