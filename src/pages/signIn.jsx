import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import {auth} from '../../FireBase'
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#ff4d2d";
  const bgColor = "#ff4d2d";
  const borderColor = "#ff4d2d";
  const [hide, setHide] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

     const handelGoogleAuth = async () => {
       try {
         const provider = new GoogleAuthProvider();
         const result = await signInWithPopup(auth, provider);
         console.log(result);
       } catch (error) {
         console.log(error);
       }
       navigate("/home");
     };


  const handelSignup =  async() => {
   try {
       if (!formData.email || !formData.password) {
         alert("Please fill all the fields");
       } else {
         const data = { ...formData, role };
         await axios.post(`${server}/signin`,data,{withCredentials:true,});
         alert("signin success");
         navigate('/home');
         console.log(data);
         setData({
           email: "",
           password: "",
         });
         setRole("");
       }
   } catch (error) {
      console.log(error)
   }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full p-4"
      style={{ backgroundColor: bgColor }}
    >
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
        <div className="text-right mb-4 " style={{ color: primaryColor }} onClick={()=>navigate('/forgot-password')}>
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
          <div className="relative">
            {["User", "Owner", "Rider"].map((r) => (
              <button
                key={r}
                className="m-2 p-2 border rounded-lg focus:border-blue-500 cursor-pointer"
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
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 hover:bg-orange-200`}
          style={{
            backgroundColor: primaryColor,
            color: "white",
          }}
          onClick={handelSignup}
        >
          SignIn
        </button>
          <button
                    className={`w-full mt-4 flex items-center justify-center font-semibold py-2 rounded-lg border border-gray-300 transition duration-200 hover:bg-gray-600`}
                    style={{ backgroundColor: "white", color: "#333" }}
                    onClick={handelGoogleAuth}
                  >
                    <FcGoogle size={20} />
                    <span>Signup with Google</span>
                  </button>
                  <button className="mt-4 text-gray-600 w-full" onClick={()=>navigate('/signup')}>
                    <p className='text-center'>
                      Create an account?{" "}
                      <span style={{ color: primaryColor }}>Signup</span>
                    </p>
                  </button>
      </div>
    </div>
  );
}

export default SignIn;
