import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeperator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/RecentExpenses";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncomes from "../../components/Dashboard/RecentIncomes";
import { useProgressBar } from "../../context/ProgressBarContext";

const Home = () => {
  const { startProgress, stopProgress } = useProgressBar();
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasFetchedRef = useRef(false); // this prevents refetching on re-renders

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (hasFetchedRef.current) return;

      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        if (response.data) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
        hasFetchedRef.current = true;
        stopProgress();
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="md:m-8 w-[90vw] md:w-auto  grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.grossAmt || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncomeAmt || 0)}
            color="bg-green"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpenseAmt || 0)}
            color="bg-danger"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:m-8">
          <RecentTransactions
            transaction={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalIncome={dashboardData?.totalIncomeAmt || 0}
            totalExpense={dashboardData?.totalExpenseAmt || 0}
            grossAmount={dashboardData?.grossAmt }
            onSeeMore={() => navigate("/expense")}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30days?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30days?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60days?.transactions || []}
            totalIncome={dashboardData?.totalIncomeAmt || 0}
          />

          <RecentIncomes
            transactions={dashboardData?.last60days?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
