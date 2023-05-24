import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import useAuthContext from "../contexts/AuthContext";

import '../styles/AdminHome.css'

function AdminHome() {
  const { logout } = useAuthContext();

  return (
    <div className="admin-home">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHome;
