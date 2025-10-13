import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {server} from '../App'
import { auth } from '../../FireBase.js';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Signup() {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#ff4d2d";
    const bgColor = "#ff4d2d";
    const borderColor = "#ff4d2d";
    const [hide, setHide] = useState(false);
    const [role, setRole] = useState("User");
    const navigate = useNavigate();
    const [formData,setData] = useState({
      fullName:"",
      email:"",
      phoneNumber:"",
      password:"",
      confirmPassword:"",
    })

    const handelGoogleAuth= async()=>{
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth,provider)
        console.log(result)
       
      } catch (error) {
        console.log(error)
      }
       navigate("/home");
    }

    const handelSignup =async ()=>{
   try{
       if(!formData.fullName || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword){
        alert("Please fill all the fields")
    }
    else if(formData.password !== formData.confirmPassword){
        alert("Password and Confirm Password must be same")
    }
    else{
      const data = { ...formData, role };
      await axios.post(`${server}/signup`, data, {
        withCredentials: true,
      });
      alert("Signup Successful");
      navigate("/signin");
      console.log(data);
      setData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
    }
   }
  catch(error){
    console.log(error);
  }}

    
  return (
    <div
      className="min-h-screen flex items-center justify-center w-full p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div
          className="bg-white rounded-xl shadow-lg max-w-md p-8 border-[1px] w-full"
          style={{ borderColor: borderColor }}
        >
          <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: primaryColor }}>
            FoodMark
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Create your account to get started with delicious food deliveries{" "}
          </p>
          {/* fullname */}
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
              onChange={(e) => {
                setData({ ...formData, fullName: e.target.value });
              }}
            />
          </div>
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
              onChange={(e) => {
                setData({ ...formData, phoneNumber: e.target.value });
              }}
            />
          </div>
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
          {/* confirm password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={hide ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter Confirm Password"
                value={formData.confirmPassword}
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => {
                  setData({ ...formData, confirmPassword: e.target.value });
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
                  className="m-2 p-2 border rounded-lg focus:border-blue-500 cursor-pointer"
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
            Signup
          </button>
          <button
            className={`w-full mt-4 flex items-center justify-center font-semibold py-2 rounded-lg border border-gray-300 transition duration-200 hover:bg-gray-600`}
            style={{ backgroundColor: "white", color: "#333" }}  onClick={handelGoogleAuth}
          >
            <FcGoogle size={20} />
            <span>Signup with Google</span>
          </button>
          <button className="mt-4 text-gray-600 w-full" onClick={()=>navigate('/signin')}>
            <p className='text-center'>
              Already have an account?{" "}
              <span style={{ color: primaryColor }}>SignIn</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup