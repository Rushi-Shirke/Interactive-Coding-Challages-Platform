import React, { useEffect, useState } from "react";
import {
  BsGrid1X2Fill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsJustify,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getSessionUser } from "../../utils/authApi";
import { getUserLeaderboard } from "../../utils/leaderboardApi";
import { logout } from "../../utils/authApi";
import User from "../../assets/images/User.png"; // Default user image
import "./Dashboard.css";

function Sidebar({
  openSidebarToggle,
  OpenSidebar,
  setDifficultyFilter = () => {},
}) {
  const [user, setUser] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      sessionStorage.clear(); // ✅ Remove stored user session
      toast.success("Logged out successfully!"); // ✅ Show success message

      setIsMenuOpen(false);
      setTimeout(() => {
        navigate("/login", { replace: true }); // ✅ Redirect to login page
      }, 1500);
    } catch (error) {
      toast.error("Logout failed! Please try again.");
    }
  };

  // Fetch user session data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getSessionUser();
        console.log("Fetched User Data:", userData);

        // Ensure userData is an object (handle array case)
        if (Array.isArray(userData) && userData.length > 0) {
          setUser(userData[0]); // Take the first user if it's an array
        } else if (userData) {
          setUser(userData); // Directly set the user if it's an object
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch leaderboard data after user is set
  useEffect(() => {
    if (user?.userId) {
      const fetchLeaderboard = async () => {
        try {
          const lbData = await getUserLeaderboard(user.userId);
          setLeaderboardData(lbData);
        } catch (error) {
          console.error("Failed to fetch leaderboard data:", error);
        }
      };

      fetchLeaderboard();
    }
  }, [user?.userId]); // Dependency added to trigger fetch when user is set

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand text-center">
          <img
            src={
              leaderboardData?.userImage &&
              leaderboardData?.userImage.trim() !== ""
                ? leaderboardData.userImage
                : User // Default image if userImage is empty or undefined
            }
            alt="User"
            className="user-image"
          />
          <h3 className="body-text-bold">
            {leaderboardData?.userName || "Guest User"}
          </h3>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <BsJustify />
        </span>
      </div>
      <hr />
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/edit-profile">
            <BsListCheck className="icon" /> Edit Profile
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link onClick={handleLogout}>
            <BsMenuButtonWideFill className="icon" /> Sign out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
