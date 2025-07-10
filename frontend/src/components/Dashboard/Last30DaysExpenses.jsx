import React from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
const Last30DaysExpenses = ({data}) => {
    const[chartData, setChartData] = React.useState([]);

    React.useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        return () => {
            // setChartData([]);
        }
    }, [data])
  return (
    <div className="card-shadow-all card col-span-1 ">
        <div className="flex items-center justify-between">
            <h5 className="text-sm mb-2 md:text-lg">Last 30 Days Expenses</h5>
        </div>
        <CustomBarChart data={chartData} colorRange ={ ["#fecaca", "#dc2626"]}></CustomBarChart> 

    </div>
  )
}

export default Last30DaysExpenses
