import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import { auth } from "../../FireBase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#ff4d2d";
  const borderColor = "#ff4d2d";
  const [hide, setHide] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success("Signed in with Google! Redirecting...");
      try {
        const { data } = await axios.post(
          `${server}/google-auth`, // Fixed: Added server prefix
          {
            email: result.user.email,
          },
          { withCredentials: true }
        );
        console.log(data, "google auth data");
      } catch (error) {
        console.log(error);
      }
      const res = { ...result, role: "User" }; // Fixed: role lowercase
      dispatch(setUserData(res));
      console.log(result);
    } catch (error) {
      toast.error("Google signin failed. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleSignin = async () => {
    if (isLoading) return; // Prevent double-click

    if (!formData.email || !formData.password) {
      toast.warning("Please fill all the fields");
      return;
    }
    if (!role) {
      toast.warning("Please select a role");
      return;
    }

    setIsLoading(true);
    const data = { ...formData, role };

    try {
      const res = await axios.post(`${server}/signin`, data, {
        withCredentials: true,
      });

      toast.success("SignIn Success 👌");

      console.log(res.data);
      dispatch(setUserData(res.data));

      // Reset and navigate after toast
      setTimeout(() => {
        setData({
          email: "",
          password: "",
        });
        setRole("");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || "SignIn Failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full p-4  bg-[#fff9f6]">
      <div
        className="bg-white rounded-xl shadow-lg max-w-md p-8 border-[1px]"
        style={{ borderColor: borderColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          FoodMark
        </h1>
        <p className="text-gray-600 mb-8">
          SignIn your account to get started with delicious food deliveries{" "}
        </p>
        {/* fullname */}
        {/* email */}
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
            onChange={(e) => {
              setData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        {/* PhoneNumber */}
        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={hide ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter Password"
              value={formData.password}
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => {
                setData({ ...formData, password: e.target.value });
              }}
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              type="button"
              onClick={() => setHide(!hide)}
            >
              {!hide ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div
          className="text-right mb-4 "
          style={{ color: primaryColor }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </div>
        {/* confirm password */}
        {/* role */}
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
                className="m-2 p-2 border rounded-lg focus:border-orange-500 cursor-pointer"
                value={role}
                onClick={() => setRole(r)}
                type="button"
                style={
                  role === r
                    ? {
                        backgroundColor: hoverColor,
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
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-200"
          }`}
          style={{
            backgroundColor: primaryColor,
            color: "white",
          }}
          onClick={handleSignin}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "SignIn"}
        </button>
        <button
          className={`w-full mt-4 flex items-center justify-center font-semibold py-2 rounded-lg border border-gray-300 transition duration-200 hover:bg-gray-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ backgroundColor: "white", color: "#333" }}
          onClick={handleGoogleAuth}
          disabled={isLoading}
        >
          <FcGoogle size={20} />
          <span>{isLoading ? "Loading..." : "Sign in with Google"}</span>
        </button>
        <button
          className="mt-4 text-gray-600 w-full"
          onClick={() => navigate("/signup")}
        >
          <p className="text-center">
            Create an account?{" "}
            <span style={{ color: primaryColor }}>Signup</span>
          </p>
        </button>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default SignIn;
