import React from "react";
import { BsSearch, BsJustify } from "react-icons/bs";
import "./AdminDashboard.css";

function AdminDashboardHeader({ OpenSidebar }) {
  return (
    <header className="DashboardHeader">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-center">
        <h4 className="text-center">Admin's Dashboard</h4>
      </div>
    </header>
  );
}

export default AdminDashboardHeader;
