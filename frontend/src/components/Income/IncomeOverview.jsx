import React from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'

const IncomeOverview = ({transactions, onAddIncome} ) => {
  const [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    const data =prepareExpenseBarChartData(transactions)
    setChartData(data);
    return () => {}
  },[transactions])
  return (
    <div>
      
    </div>
  )
}

export default IncomeOverview
