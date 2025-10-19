import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import SignIn from "./pages/signIn";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/Home";
import useGetCurrent from "./hooks/useGetCurrent";

// NEW: Import ToastContainer and CSS
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import useGetCity from "./hooks/useGetCity";

export const server = "https://food-mark.vercel.app";
export const userData = "https://food-mark.vercel.app";

function App() {
  useGetCurrent();
  useGetCity();
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        ></Route>
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        ></Route>
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
