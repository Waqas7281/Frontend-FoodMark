import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import SignIn from "./pages/signIn";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/Home";
export const server = "https://food-mark.vercel.app/api/auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
    </Routes>
  );
}

export default App;
