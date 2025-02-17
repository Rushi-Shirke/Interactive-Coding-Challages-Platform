import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import DashboardHome from "./AdminDashboardHome";
import QuestionsTable from "./QuestionsTable";
import DashboardHeader from "./AdminDashboardHeader";
import "./AdminDashboard.css";
import ChangePassword from "./ChangePassword";
import QuestionForm from "./QuestionForm";

function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebarToggle((prev) => !prev);
  };

  return (
    <div className="grid-container">
      {/* Dashboard Header */}
      <DashboardHeader OpenSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="questions" element={<QuestionsTable />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="addQuestion" element={<QuestionForm />} />
          <Route path="editQuestion/:id" element={<QuestionForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminDashboard;
