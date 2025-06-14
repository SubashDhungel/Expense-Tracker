import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className="  flex items-center gap-6 bg-white p-6 rounded-2xl card-shadow-all border border-gray-200/50">
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div className="flex flex-col justify-center items-center">
            <h6 className = "m-0 text-sm text-gray-500 mb-1">{label}</h6>
            <span className = " text-[20px]">${value}</span>
        </div>
      
    </div>
  )
}

export default InfoCard
