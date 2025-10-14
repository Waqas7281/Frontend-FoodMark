import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import SignIn from "./pages/signIn";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/Home";

// NEW: Import ToastContainer and CSS
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const server = "https://food-mark.vercel.app/api/auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
      {/* NEW: Add ToastContainer here - it's now global and persists across routes */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
