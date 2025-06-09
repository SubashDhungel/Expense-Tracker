import { useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'


const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(!true);
const fetchDashboardData = async () => {
  if (loading) return;
  setLoading(true);
  try {
    const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
    if (response.data) {
      setDashboardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    setLoading(!true)
  }
};


useEffect(() => {
  fetchDashboardData();
  return ()=>{}
}, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto"></div>
      </DashboardLayout>
  )
}

export default Home
