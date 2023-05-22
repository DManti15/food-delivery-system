import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import useAuthContext from "../contexts/AuthContext";

import '../styles/AdminHome.css'

function AdminHome() {
  const { user, logout } = useAuthContext();

  return (
    <div className="admin-home">
      <Sidebar />
      <div className="admin-content">
        Hello {user?.username}, This is the admin dashboard
        <button onClick={logout}>Logout</button>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHome;
