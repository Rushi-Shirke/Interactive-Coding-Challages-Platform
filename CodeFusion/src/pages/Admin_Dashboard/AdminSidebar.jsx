import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsJustify,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import User from "../../assets/images/User.png";
import "./AdminDashboard.css";

function AdminSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand text-center">
          <img src={User} alt="User" className="user-image" />
          <h3 className="body-text-bold">Rushikesh Shirke</h3>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <BsJustify />
        </span>
      </div>
      <hr />
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/admindashboard">
            <BsGrid1X2Fill className="icon" /> Users
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admindashboard/questions">
            <BsFillArchiveFill className="icon" /> Questions
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admindashboard/changePassword">
            <BsListCheck className="icon" /> Change Password
          </Link>
        </li>
        <li className="sidebar-list-item">
          <button
            className="sidebar-logout-btn"
            onClick={() => console.log("Signing out...")}
          >
            <BsMenuButtonWideFill className="icon" /> Sign Out
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
