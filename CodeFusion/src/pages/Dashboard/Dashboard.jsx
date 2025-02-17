import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import UsersTable from "./UsersTable";
import DashboardHeader from "./DashboardHeader";
import { getSessionUser } from "../../utils/authApi";
import "./Dashboard.css";

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [userId, setUserId] = useState(null);

  const toggleSidebar = () => {
    setOpenSidebarToggle((prev) => !prev);
  };

  useEffect(() => {
    // console.log("Dashboard: difficultyFilter updated to", difficultyFilter);
  }, [difficultyFilter]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getSessionUser(); // Fetch user session data
        setUserId(userData?.userId); // Set userId from API response
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="grid-container">
      {/* Dashboard Header */}
      <DashboardHeader OpenSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar
        userId={userId} // ✅ Fix: Pass userId
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={toggleSidebar}
        setDifficultyFilter={setDifficultyFilter} // Directly passing the function
      />

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route
            path="/questions"
            element={
              <UsersTable
                key={difficultyFilter}
                difficultyFilter={difficultyFilter}
                userId={userId} // ✅ Fix: Pass userId to UsersTable
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
