import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { isEmailValid, isPasswordValid } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  // Handles login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid(password)) {
      // setError("Password must be 8+ chars with a letter & number.");
      // return;
    }

    // Login API call
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      updateUser(res.data.userWithoutPass);
      navigate("/dashboard");
      toast.success("Login successful! ");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(
          err.response.data.message || "Login failed. Please try again."
        );
        toast.error( "Login failed. Please try again.");

      } else {
        setError("An unexpected error occurred. Please try again later.");
        toast.error("An unexpected error occurred !");
      }
      return;
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-sans font-semibold text-black">
          Welcome Back
        </h3>
        <p className="font-sans text-xs text-slate-700 -mt-[15px] mb-6">
          Please Enter Your Credentials to Login
        </p>

        <form action="" onSubmit={handleLogin}>
          <Input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address : "
            placeholder="nirajan@example.com"
          />

          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password : "
            placeholder="password"
          />

          <div className="h-4 text-xs font-sans text-red-500 transition-opacity duration-300">
            {error ? (
              <p className="opacity-100">{error}</p>
            ) : (
              <p className="opacity-0">.</p>
            )}
          </div>

          <button type="submit" className="btn-primary mt-3 cursor-pointer">
            Login
          </button>

          <p className="font-sans text-xs text-slate-800 mt-4">
            Don't have an account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
