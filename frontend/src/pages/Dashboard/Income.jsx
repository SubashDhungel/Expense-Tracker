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
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import { useProgressBar } from "../../context/ProgressBarContext";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const { startProgress, stopProgress } = useProgressBar();
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
      stopProgress();
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

  const handleDownloadIncome = async () => {

     try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });
      

      // Create an URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
     
    } catch (error) {
      console.error("Error downloading income:", error);
      toast.error("Failed to download income. Please try again.");
    }

  };

  // Handle Delete Income
  const deleteIncome = async (id) => {
    try{
      const response = await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      if (response.data) {
        toast.success("Income deleted successfully!");
        setOpenDeleteAlert({ show: false, data: null });
        getAllIncomes(); // Refresh income data
      }
    }catch(error){
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income. Please try again.");
      setOpenDeleteAlert({ show: false, data: null });
      
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

          <IncomeList
            transactions={incomeData}
            // loading={loading}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncome}
          />
        </div>

        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}></AddIncomeForm>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >

          <DeleteAlert 
          content="Are you sure want to delete this Income ? "
          onDelete={()=>deleteIncome(openDeleteAlert.data)}
          
          ></DeleteAlert>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
