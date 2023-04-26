import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/AuthLayout";
import GuestLayout from "./components/GuestLayout";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import Guest from "./pages/Guest";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="guest" element={<Guest />} />
          <Route path="admin" element={<AdminLogin />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="admin-home" element={<AdminHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
