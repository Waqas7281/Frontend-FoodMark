import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { server } from "../App";
import { auth } from "../../FireBase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// REMOVED: Toast imports/CSS (handled globally in App.js)
import { toast } from "react-toastify"; // Only import toast for use here
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice.js";


function Signup() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ff4d2d";
  // REMOVED: Unused hoverColor
  const [hidePassword, setHidePassword] = useState(false); // Separate for password
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false); // Separate for confirm
  const [role, setRole] = useState("User");
  const [isLoading, setIsLoading] = useState(false); // NEW: Loading state
  const navigate = useNavigate();
  const [formData, setData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success("Signed in with Google! Redirecting...");
      try {
        const  data  = await axios.post(
          `/google-auth`,
          {
            email: result.user.email,
          },
          { withCredentials: true }
        );

        console.log(data, "google auth data");
      } catch (error) {
        console.log(error);
      }
      const res = { ...result, role: "User" };
      dispatch(setUserData(res));
      console.log(result);
    } catch (error) {
      toast.error("Google signin failed. Please try again.");
      toast.warn(error.response.data)
      console.log(error.response);
    }
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const dispatch = useDispatch();

  const handleSignup = async () => {
    // Fixed typo
    if (isLoading) return; // Prevent double-click

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.warning("Fill all Fields", { autoClose: 3000 }); // Added autoClose
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Password and Confirm Password must be same", {
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true); // Start loading
    const data = { ...formData, role };

    try {
      toast.loading("Signup Pending"); // Manual pending toast

      await axios.post(
        `${server}/signup`,
        data,
        {
          withCredentials: true,
        }
      );

      toast.dismiss(); // Dismiss pending toast
      toast.success("Signup Success 👌"); // Success toast

      // Reset form early (before nav)
      setData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (error) {
      toast.dismiss(); // Dismiss pending toast
      // Fixed: Access via error.response
      const errorMessage = error?.response?.data?.message || "Signup Rejected 🤯";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full p-4 bg-[#fff9f6]">
      <div className="flex flex-col items-center justify-center w-full">
        <div
          className="bg-white rounded-xl shadow-lg max-w-md p-8 border-[1px] w-full"
          style={{ borderColor: borderColor }}
        >
          <h1
            className="text-3xl font-bold mb-2 text-center"
            style={{ color: primaryColor }}
          >
            FoodMark
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Create your account to get started with delicious food deliveries{" "}
          </p>

          {/* Fullname - unchanged */}
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-700 font-medium mb-1"
            >
              Fullname
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter FullName"
              value={formData.fullName}
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) =>
                setData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          {/* Email - unchanged */}
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter Your Email"
              value={formData.email}
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* PhoneNumber - unchanged */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) =>
                setData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>

          {/* Password - separate toggle */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={hidePassword ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter Password"
                value={formData.password}
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) =>
                  setData({ ...formData, password: e.target.value })
                }
              />
              <button
                className="absolute right-3 top-3 text-gray-500"
                type="button"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {!hidePassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password - separate toggle */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={hideConfirmPassword ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter Confirm Password"
                value={formData.confirmPassword}
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) =>
                  setData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <button
                className="absolute right-3 top-3 text-gray-500"
                type="button"
                onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
              >
                {!hideConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Role - fixed focus color */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <div className="relative flex justify-center">
              {["User", "Owner", "Rider"].map((r) => (
                <button
                  key={r}
                  className="m-2 p-2 border rounded-lg focus:border-orange-500 cursor-pointer" // Fixed to orange
                  onClick={() => setRole(r)}
                  type="button"
                  style={
                    role === r
                      ? {
                          backgroundColor: primaryColor, // Use primary for active
                          color: "white",
                          border: `1px solid ${borderColor}`,
                        }
                      : { border: `1px solid ${borderColor}`, color: "#333" }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`w-full font-semibold py-2 rounded-lg transition duration-200 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-orange-200"
            }`} // Disable styling when loading
            style={{
              backgroundColor: primaryColor,
              color: "white",
            }}
            onClick={handleSignup}
            disabled={isLoading} // NEW: Disable button
          >
            {isLoading ? "Signing Up..." : "Signup"} {/* NEW: Loading text */}
          </button>

          <button
            className={`w-full mt-4 flex items-center justify-center font-semibold py-2 rounded-lg border border-gray-300 transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
            style={{ backgroundColor: "white", color: "#333" }}
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <FcGoogle size={20} />
            <span>{isLoading ? "Loading..." : "Signup with Google"}</span>
          </button>

          <button
            className="mt-4 text-gray-600 w-full"
            onClick={() => navigate("/signin")}
          >
            <p className="text-center">
              Already have an account?{" "}
              <span style={{ color: primaryColor }}>SignIn</span>
            </p>
          </button>
        </div>
      </div>
      {/* REMOVED: Duplicate <ToastContainer /> */}
    </div>
  );
}

export default Signup;