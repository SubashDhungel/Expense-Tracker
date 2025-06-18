import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/layouts/Modal";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState({show:false, data:null});
  
  
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
  }

  React.useEffect(() => {
    getAllIncomes();
  }
  , []);

  // Handle Add Income





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
        isOpen ={OpenAddIncomeModal}
        onClose={() => setOpenAddIncomeModal({show:false, data:null})}
        title = "Add Income"
        >
        <div className="">Add Income Form</div>

        </Modal>

      </div>
    </DashboardLayout>
  );
};

export default Income;
