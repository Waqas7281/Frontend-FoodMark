import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios"
import server from '../App'

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
     if (!email) {
       alert("Please enter your email address.");
       return; // Early exit to avoid proceeding
     }

     // Ensure email is sent as an object in the request body (common for JSON APIs)
     const response = await axios.post(
       `${server}/sendotp`,
       email, // Wrap in object if 'email' is a string variable
       {
         withCredentials: true,
         headers: {
           "Content-Type": "application/json", // Explicitly set for JSON body
         },
       }
     );

     console.log("OTP sent successfully:", response.data);
     alert("OTP sent to your email! Check your inbox.");
     setStep(2);
   } catch (error) {
     console.error(
       "Step 1 submit error:",
       error.response?.data || error.message
     );

     // User-friendly error based on status
     if (error.response?.status === 404) {
       alert(
         "Service unavailable. The OTP endpoint is not set up yet—check your backend routes."
       );
     } else if (error.response?.status === 400) {
       alert("Invalid email. Please try again.");
     } else {
       alert("Something went wrong. Please try again later.");
     }
   }
 };

  const handleStep2Submit = async() => {
    try {
      if (!otp.otp.trim()) {
        alert("Please fill all the fields");
        return;
      }
      else{
       const  data={...email,...otp}
        await axios.post(`${server}/verifyOtp`, data, {
          withCredentials: true,
        });
        alert('otp send to  backend');
      }
      // Here you would typically verify the OTP and navigate to reset password
      alert("OTP verified! Redirecting to reset password...");
      setStep(3);
    } catch (error) {
      console.log(error)
    }
    // navigate("/reset-password"); // Uncomment if route exists
  };

  const handelNewPassword = async()=>{
   try {
     if (
       !passwordData.newPassword.trim() ||
       !passwordData.confirmPassword.trim()
     ) {
       alert("Please fill all the fields");
       return;
     } else if (passwordData.newPassword !== passwordData.confirmPassword) {
       alert("New Password and Confirm Password must be same");
       return;
     } else {
      await axios.post(
        `${server}/resetPassword`,
        {...passwordData,...email},
        { withCredentials: true }
      );
       alert(
         "Password reset successful! Please sign in with your new password."
       );
       navigate("/signin");
     }
   } catch (error) {
    console.log(error)
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
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Register your  Password
                </label>
                <input
                  id="otp"
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-gray-300 mb-4"
                  placeholder=" New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => {
                    setPasswordData({ ...passwordData, newPassword: e.target.value });
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