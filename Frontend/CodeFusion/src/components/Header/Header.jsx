import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/images/logo_cf.png";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import { MdPerson } from "react-icons/md";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
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
                  <Link
                    className="dropdown-item"
                    to="/signout"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Out
                  </Link>
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
