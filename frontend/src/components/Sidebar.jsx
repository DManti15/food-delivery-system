import React from "react";
import { Link } from "react-router-dom";

import IMAGES from "../assets/images";

import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <div className="side-header">
          <img
            src={IMAGES.logos.mtLogo}
            alt="Mission Trip ministry logo"
            className="mtLogo-nav"
          />
          <h2>Admin Dashboard</h2>
        </div>
        <ul className="side-items">
          <li><Link className="side-link">Dashboard</Link></li>
          <li><Link className="side-link">Products</Link></li>
          <li><Link className="side-link">Users</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
