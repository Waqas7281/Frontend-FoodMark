import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios"
import { server } from '../App'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Start with step 1 (email)
  const [email, setFormData] = useState({
    email: "",
  });
  const [otp, setOtpData] = useState({
    otp: "",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

 const handleStep1Submit = async (e) => {
   e?.preventDefault(); // Prevent default form submit if this is a form handler
   console.log("Step 1 submit triggered");

   try {
     if (!email.email.trim()) {
       toast.warning("Please enter your email address.");
       return; // Early exit to avoid proceeding
     }

     // Ensure email is sent as an object in the request body (common for JSON APIs)
     const response = await axios.post(
       `${server}/sendotp`,
       email, // Wrap in object if 'email' is a string variable
       {
        
       }
     );

     console.log("OTP sent successfully:", response.data);
     toast.success("OTP sent to your email! Check your inbox.");
     setStep(2);
   } catch (error) {
     console.error(
       "Step 1 submit error:",
       error.response?.data || error.message
     );

     // User-friendly error based on status
     if (error.response?.status === 404) {
       toast.error("Service unavailable.");
     } else if (error.response?.status === 400) {
       toast.error("Invalid email. Please try again.");
     } else {
       toast.error("Something went wrong.");
     }
   }
 };

  const handleStep2Submit = async() => {
    try {
      if (!otp.otp.trim()) {
        toast.warning("Please fill all the fields");
        return;
      }
      else{
       const  data={...email,...otp}
        await axios.post(`${server}/verifyOtp`, data, {
          withCredentials: true,
        });
        toast.success("Otp send to Backend");
      }
      // Here you would typically verify the OTP and navigate to reset password
      setStep(3);
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
    // navigate("/reset-password"); // Uncomment if route exists
  };

  const handelNewPassword = async()=>{
   try {
     if (
       !passwordData.newPassword.trim() ||
       !passwordData.confirmPassword.trim()
     ) {
       toast.warning("Please fill all the fields");
       return;
     } else if (passwordData.newPassword !== passwordData.confirmPassword) {
       toast.warning("Password must be same")
       return;
     } else {
      await axios.post(
        `${server}/resetPassword`,
        {...passwordData,...email},
        { withCredentials: true }
      );
       toast.success(
         "Password reset successful! Please sign in with your new password.");
       setTimeout(()=>{
        navigate("/signin");
       },2000)
     }
   } catch (error) {
    toast.warning(error?.response?.data?.message)
   }
  }
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => {
              navigate("/signin");
            }}
          />
          <h1 className="text-3xl font-bold text-[#ff4d2d] flex-1 text-center">
            Forgot Password
          </h1>
        </div>
        <div>
          {step === 1 && (
            <div>
              <ToastContainer position="top-right" />
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-gray-300"
                  placeholder="Enter Your Email"
                  value={email.email}
                  onChange={(e) => {
                    setFormData({ ...email, email: e.target.value });
                  }}
                />
                <button
                  className="mt-4 w-full bg-[#ff4d2d] text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={handleStep1Submit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <ToastContainer position="top-right" />
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-gray-700 font-medium mb-1"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-gray-300"
                  placeholder="Enter Your OTP"
                  value={otp.otp}
                  onChange={(e) => {
                    setOtpData({ ...otp, otp: e.target.value });
                  }}
                />
                <button
                  className="mt-4 w-full bg-[#ff4d2d] text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={handleStep2Submit}
                >
                  Verify
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <ToastContainer position="top-right" />
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Register your Password
                </label>
                <input
                  id="otp"
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-gray-300 mb-4"
                  placeholder=" New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => {
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    });
                  }}
                />
                <input
                  id="otp"
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-gray-300"
                  placeholder=" Confirm Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => {
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
                <button
                  className="mt-4 w-full bg-[#ff4d2d] text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={handelNewPassword}
                >
                  submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;