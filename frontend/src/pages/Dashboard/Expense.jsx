import React, { useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import { useProgressBar } from "../../context/ProgressBarContext";


const Expense = () => {
  useUserAuth();
  const { startProgress, stopProgress } = useProgressBar();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get All Expenses
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
        stopProgress();

    }
  };
  React.useEffect(() => {
    getAllExpenses();
    return () => {};
  }, []);

  // Handle Add Expense

  const handleAddExpense = async (expenseData) => {
    const { category, amount, date, icon } = expenseData;
    console.log("Adding expense:", expenseData);

    // Validate input
    if (!category || !amount || !date) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      if (response.data) {
        toast.success("Expense added successfully!");
        setOpenAddExpenseModal(false);
        getAllExpenses(); // Refresh expense data
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }
  };

  const handleDownloadExpense = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });
      

      // Create an URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
     
    } catch (error) {
      console.error("Error downloading expense:", error);
      toast.error("Failed to download expense. Please try again.");
    }
  };

  // Handle Delete Expense
  const deleteExpense = async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );
      if (response.data) {
        setOpenDeleteAlert({ show: false, data: null });
        getAllExpenses(); // Refresh expense data
        toast.success("Expense deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      setOpenDeleteAlert({ show: false, data: null });
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions = {expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
                />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete = {(_id) => setOpenDeleteAlert({ show: true, data: _id })}
            onDownload = {handleDownloadExpense}
            />


        </div>

        {/* Add Expense Modal */}
         <Modal
          isOpen={OpenAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
          />
        </Modal> 

         <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert(false)}
          title="Delete Expense"
        >
          <DeleteAlert
          content = "Are you sure you want to delete this expense?"
          onDelete = {() => deleteExpense(openDeleteAlert.data) }
          />
        </Modal> 
      </div>
    </DashboardLayout>
  );
};

export default Expense;
