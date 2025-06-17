import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState({show:false, data:null});
  
  
  // Get All Incomes
  const getAllIncomes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle Add Income


  const addIncome = async (incomeData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD, incomeData);
      if (response.data) {
        setIncomeData((prev) => [...prev, response.data]);
        setOpenAddIncomeModal({ show: false, data: null });
      }
    } catch (error) {
      console.error("Error adding income:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle Delete Income
  const deleteIncome = async (incomeId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`${API_PATHS.INCOME.DELETE}/${incomeId}`);
      if (response.data) {
        setIncomeData((prev) => prev.filter((income) => income._id !== incomeId));
        setOpenDeleteAlert(false);
      }
    } catch (error) {
      console.error("Error deleting income:", error);
    } finally {
      setLoading(false);
    }
  }


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
      </div>
    </DashboardLayout>
  );
};

export default Income;
