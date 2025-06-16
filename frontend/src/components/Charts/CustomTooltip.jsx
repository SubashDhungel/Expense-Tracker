import React from 'react'

const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md p-3 border border-gray-300 ">
                <p className="txt-xs font-semibold text-purple-800 m-0 p-0">{payload[0].name}</p>
                <p className="text-sm text-gray-600 mt-0 mb-0">
                    Amount: <span className='text-sm font-medium text-gray-900'> ${payload[0].value}</span>
                </p>
            </div>
        );
    }
  return (
    <div>
      
    </div>
  )
}

export default CustomTooltip
