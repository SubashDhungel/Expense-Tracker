import React from 'react'
import {LuPlus} from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../Charts/CustomLineChart'
const ExpenseOverview = ({transactions, onAddExpense}) => {
  const [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    const data =prepareExpenseLineChartData(transactions)
    setChartData(data);
    return () => {}
  },[transactions])
  console.log("transactions", transactions)
  // console.log(`This is chart data ${chartData}`)
  console.log("This is chart data:", JSON.stringify(chartData, null, 2));

  
    return (
    <div className="card card-shadow-all">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5"> Track your expenses overtime and gain insights into your spending habits</p>
        </div>
        <button className="add-btn" onClick={onAddExpense}><LuPlus className='text-lg'/>Add Expense</button>
      </div>
      <div className="mt-10">
        <CustomLineChart
          data={chartData}
        />
      </div>
    </div>
  )
}

export default ExpenseOverview
