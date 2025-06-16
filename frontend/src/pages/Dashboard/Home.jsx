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
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
const Home = () => {
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
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="m-8  grid grid-cols-1 md:grid-cols-3 gap-6">
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
            color="bg-green-600"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpenseAmt || 0)}
            color="bg-red-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-8">
          <RecentTransactions
            transaction={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          ></RecentTransactions>

          <FinanceOverview
            totalIncome={dashboardData?.totalIncomeAmt || 0}
            totalExpense={dashboardData?.totalExpenseAmt || 0}
            grossAmount={dashboardData?.grossAmt || 0}
            onSeeMore={() => navigate("/expense")}
          ></FinanceOverview>

          <ExpenseTransactions
            transactions={dashboardData?.last30days?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          ></ExpenseTransactions>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
