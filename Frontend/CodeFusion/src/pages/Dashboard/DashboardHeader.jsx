import React from "react";
import { BsSearch, BsJustify } from "react-icons/bs";
import "./Dashboard.css";

function DashboardHeader({ OpenSidebar }) {
  return (
    <header className="DashboardHeader">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-center">
        <h4 className="text-center">User's Dashboard</h4>
      </div>
    </header>
  );
}

export default DashboardHeader;
