import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate}  from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import axiosInstance from './utils/axiosInstance';
import { API_PATHS } from './utils/apiPaths';
import UserProvider, { UserContext } from './context/userContext';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/income" element={<Income/>} />
          <Route path="/expense" element={<Expense/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);
  const { updateUser, clearUser } = useContext(UserContext);

  React.useEffect(() => {
    axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
      .then((res) => {
        setIsAuthenticated(true);
        updateUser(res.data); // Set user in context
      })
      .catch(() => {
        setIsAuthenticated(false);
        clearUser(); // Clear user in context
      });
  }, [updateUser, clearUser]); // <-- Add these dependencies

  if (isAuthenticated === null) return null; // or a loading spinner

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}