import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/layouts/Inputs/Input';
import { useEffect } from 'react';
import ProfilePhotoSelector from '../../components/layouts/Inputs/ProfilePhotoSelector';
import { isEmailValid, isPasswordValid, doPasswordsMatch } from '../../utils/helper';
import RedAsterisk from '../../utils/RedAsterisk';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    // setSuccess(null);
  }, [name, email, password, confirmPassword, phoneNumber, address]);

  const handleSignUp = async (e) => {
    // Handles login

    e.preventDefault();
    // let profileImageUrl = null;

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid(password)) {
      setError("Password must be 8+ chars with a letter & number.");
      return;
    }
    if (!doPasswordsMatch(password, confirmPassword)) {
      setError("Passwords do not match.");
      return;
    }
    // Sign Up API call
  }


  return (
    <AuthLayout>
      <div className="font-sans lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>
        <form action="" onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
              label={<>Full Name :  <RedAsterisk></RedAsterisk> </>}

              placeholder="Nirajan Dhungel"
            />

            <Input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label={<>Email Address :  <RedAsterisk></RedAsterisk> </>}

              placeholder="nirajan@example.com"
            />

              <Input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label={<>Password :  <RedAsterisk></RedAsterisk> </>}

                placeholder="password"
              />

              <Input
                type="password"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                label={<>Confirm Password :  <RedAsterisk></RedAsterisk> </>}
                placeholder="confirm password"
              />
              <Input
                type="number"
                value={phoneNumber}
                onChange={({ target }) => setPhoneNumber(target.value)}
                label={<>Phone Number :   </>}

                placeholder="phone number"
              />

              <Input
                type="text"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
                label={<>Address :  </>}
                placeholder="Address"
              />

          </div>
          <div className="h-4 text-xs font-sans text-red-500 transition-opacity duration-300">
            {error ? <p className="opacity-100">{error}</p> : <p className="opacity-0">.</p>}
          </div>

          <button type="submit" className="btn-primary mt-3 cursor-pointer">
            Sign Up
          </button>

          <p className="font-sans text-xs text-slate-800 mt-4">
            Already have an account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}


export default SignUp
