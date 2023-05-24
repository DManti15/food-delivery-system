import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { SidebarData } from "../components/SidebarData";

import "../styles/AdminHome.css";

function AdminHome() {
  return (
    <div className="admin-home">
      <Sidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminHome;
