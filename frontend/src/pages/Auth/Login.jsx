import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/layouts/Inputs/Input';
import { isEmailValid, isPasswordValid } from '../../utils/helper';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //handles login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!isPasswordValid(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Login Api call
    // try {
    //   const res = await fetch("http://localhost:5000/api/v1/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await res.json();
    //   if (res.status === 200) {
    //     localStorage.setItem("token", data.token);
    //     navigate("/dashboard");
    //   } else {
    //     // setError(data.message);
    //   }
    // } catch (error) {
    //   console.log(error)
    //   // setError("Something went wrong");
    // }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className="text-xl font-sans font-semibold text-black">Welcome Back</h3>
        <p className="font-sans text-xs text-slate-700 -mt-[15px] mb-6">
          Please Enter Your Credentials to Login
        </p>
        <form action="" onSubmit={handleLogin}>

          <Input type="email" value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address : " placeholder="john@example.com" />
          <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} label="Password : " placeholder="password" />
          <div className="h-4 text-xs font-sans text-red-500 transition-opacity duration-300">
            {error ? <p className="opacity-100">{error}</p> : <p className="opacity-0">.</p>}
          </div>

          <button type="submit" className="btn-primary ">
            Login
          </button>
          <p className="font-sans text-xs text-slate-800 mt-4">
            Don't have an account?{" "}
            <span className="text-primary underline cursor-pointer" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
