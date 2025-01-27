import React from "react";
import "../../assets/styles/global.css";
import "./Header.css";
import logo from "../../assets/images/logo_cf.png";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import { MdPerson } from "react-icons/md";
function Header() {
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
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FaBars className="navbar-toggler-icon" />
            </button>
          </div>

          <div
            className="collapse navbar-collapse navbar-right col-12 col-sm-3"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item nav-item-mod">
                <Link
                  className="nav-link  body-text"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item nav-item-mod">
                <Link className="nav-link  body-text" to="/problems">
                  Problems
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link body-text login-icon-link" href="#">
                  <MdPerson className="login-icon" />
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/signup">
                    Sign Up
                  </Link>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                  <Link className="dropdown-item" to="/signout">
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
