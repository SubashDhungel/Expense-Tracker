import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/layouts/Modal";
import { useUserAuth } from "../../hooks/useUserAuth";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Incomes
  const getAllIncomes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllIncomes();
  }, []);

  // Handle Add Income

  const handleAddIncome = async (incomeData) => {
    const { source, amount, date, icon } = incomeData;
    console.log("Adding income:", incomeData);

    // Validate input
    if (!source || !amount || !date) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    try {
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      if (response.data) {
        toast.success("Income added successfully!");
        setOpenAddIncomeModal(false);
        getAllIncomes(); // Refresh income data
      }
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income. Please try again.");
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}></AddIncomeForm>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
