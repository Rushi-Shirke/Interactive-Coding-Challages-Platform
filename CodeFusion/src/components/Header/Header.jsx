import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/images/logo_cf.png";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/authApi";
import { ToastContainer, toast } from "react-toastify";

import { MdPerson } from "react-icons/md";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      sessionStorage.clear(); // Remove stored user session
      toast.success("Logged out successfully!"); //  Show success message

      setIsMenuOpen(false);
      setTimeout(() => {
        navigate("/login", { replace: true }); //  Redirect to login page
      }, 1500);
    } catch (error) {
      toast.error("Logout failed! Please try again.");
    }
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-left col-12 col-sm-3">
            <Link className="navbar-brand" to="/">
              <span className="navbar_title">CodeFusion</span>
            </Link>
          </div>

          <div className="navbar-center col-12 col-sm-3">
            <Link to="/">
              <img className="logo" src={logo} alt="CodeFusionLogo" />
            </Link>
          </div>
          <div className="navbar-center-button">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <FaBars className="navbar-toggler-icon" />
            </button>
          </div>

          <div
            className={`collapse navbar-collapse navbar-right col-12 col-sm-3 ${
              isMenuOpen ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item nav-item-mod">
                <Link
                  className="nav-link  body-text"
                  aria-current="page"
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item nav-item-mod">
                <Link
                  className="nav-link  body-text"
                  to="/problems"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Problems
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link body-text login-icon-link" href="#">
                  <MdPerson className="login-icon" />
                </a>
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/admindashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
