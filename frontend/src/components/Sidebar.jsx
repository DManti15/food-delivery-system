import { CaretRight } from "@phosphor-icons/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import IMAGES from "../assets/images";
import useAuthContext from "../contexts/AuthContext";
import { SidebarData } from "./SidebarData";

import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuthContext();

  const menuHandler = () => {
    setIsOpen(!isOpen);
    if (!showMenu) setShowMenu(true);
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
              <li key={key}>
                <NavLink className="side-link" to={val.link} end>
                  <div className="item-group">
                    <div className="item-icon">{val.icon}</div>
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
            <div className={"icon caret-icon " + (isOpen ? "rotate" : "")}>
              <CaretRight size="1.8rem" />
            </div>
          </div>
          {showMenu && (
            <div
              className={"popup-menu " + (isOpen ? "shown" : "hidden")}
              onAnimationEnd={() => {
                if (!isOpen) setShowMenu(false);
              }}
            >
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
