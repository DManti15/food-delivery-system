import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";

import IMAGES from "../assets/images";
import { SidebarData } from "./SidebarData";
import useAuthContext from "../contexts/AuthContext";

import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const menuHandler = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <div className="side-header">
          <img
            src={IMAGES.logos.mtLogo}
            alt="Mission Trip ministry logo"
            className="mtLogo-side"
          />
          <h1>Admin Dashboard</h1>
        </div>
        <ul className="side-items">
          {SidebarData.map((val, key) => {
            return (
              <li onClick={ () => tableTitle(val.title) } key={key}>
                <NavLink className="side-link" to={val.link} end>
                  <div className="item-group">
                    <div className="icon item-icon">{val.icon}</div>
                    <div className="item-title">{val.title}</div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="side-profile">
          <div className="profile-wrapper" onClick={menuHandler}>
            <div className="avatar">
              <img
                src={IMAGES.placeholders.avatar}
                alt="Profile placeholder image"
                className="avatar-image"
              />
            </div>
            <div className="username">{user?.username}</div>
            <div className="icon caret-icon">
              <CaretRight size="1.8rem" />
            </div>
          </div>
          {isOpen && (
            <div className="popup-menu">
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
