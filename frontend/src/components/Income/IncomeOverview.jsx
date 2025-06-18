import React from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
const IncomeOverview = ({transactions, onAddIncome} ) => {
  const [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    const data =prepareExpenseBarChartData(transactions)
    setChartData(data);
    return () => {}
  },[transactions])

  console.log("chartData", chartData)
  console.log("transactions", transactions)
  return (
    <div className="card card-shadow-all"> 
      <div className="flex items-center justify-between">
        <div className="">
        <h5 className="text-lg">Income Overview</h5>
        <p className="text-xs text-gray-400 mt-0.5">Track your earnings overtime and manage your finances</p>
      </div>
      <button className="add-btn" onClick={onAddIncome}>
        <LuPlus className= "text-lg"/> Add
      </button>
      </div>
      <div className="mt-10">
        <CustomBarChart
        data={chartData}/>

      </div>
    </div>
  )
}

export default IncomeOverview
