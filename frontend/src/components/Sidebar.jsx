import React from "react";
import { Link } from "react-router-dom";

import IMAGES from "../assets/images";
import { SidebarData } from "./SidebarData";

import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <div className="side-header">
          <img
            src={IMAGES.logos.mtLogo}
            alt="Mission Trip ministry logo"
            className="mtLogo-side"
          />
          <h2>Admin Dashboard</h2>
        </div>
        <ul className="side-items">
          {SidebarData.map((val, key) => {
            return (
              <li key={key}>
                <div className="item-group">
                  <Link className="side-link" to={val.link}>
                    <div className="item-icon">{val.icon}</div>
                    <div className="item-title">{val.title}</div>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
