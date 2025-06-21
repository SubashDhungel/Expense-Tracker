import React,{useState} from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Modal from '../../components/layouts/Modal'
const Expense = () => {
  useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
  
    const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  
// Get All Incomes
  const getAllExpenses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu={'Expense'}>
      <div className="my-5 mx-auto"></div>

      </DashboardLayout>
  )
}

export default Expense
