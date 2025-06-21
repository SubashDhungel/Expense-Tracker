import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { useEffect } from 'react';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { isEmailValid, isPasswordValid, doPasswordsMatch } from '../../utils/helper';
import RedAsterisk from '../../utils/RedAsterisk';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage'; // have a utility function for image upload
import toast from 'react-hot-toast';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    setError(null);
  }, [name, email, password, confirmPassword, phoneNumber, address]);

  const handleSignUp = async (e) => {
    e.preventDefault();

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

    try {
      // Prepare form data for profile image if needed
      let profileImageUrl = "";
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      // Register user (send profileImageUrl if available)
      await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        // phoneNumber,
        // address,
        password,
        profileImageUrl
      });

      // Fetch user info after registration and update context
      const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      updateUser(res.data.userWithoutPass || res.data);
      navigate("/dashboard");
      // Optionally, show a success message
      toast.success("Registration successful! Welcome aboard.");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message || "Sign up failed. Please try again.");
        toast.error("Sign up failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
        toast.error("An unexpected error occurred !");
      }
      return;
    }
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
              label={<>Full Name :  <RedAsterisk /></>}

              placeholder="Nirajan Dhungel"
            />

            <Input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label={<>Email Address :  <RedAsterisk /></>}

              placeholder="nirajan@example.com"
            />

              <Input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label={<>Password :  <RedAsterisk /></>}

                placeholder="password"
              />

              <Input
                type="password"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                label={<>Confirm Password :  <RedAsterisk /></>}
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
