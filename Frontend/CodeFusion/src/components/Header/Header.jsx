import React from 'react'
import '../../assets/styles/global.css';
import './Header.css';
import logo from '../../assets/images/logo_cf.png';
import { FaBars } from 'react-icons/fa';

import { MdPerson } from "react-icons/md";
function Header() {

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className='navbar-left col-12 col-sm-3'>
                        <a className="navbar-brand" href="#">
                            <span className="navbar_title">CodeFusion</span>
                        </a>
                    </div>

                    <div className='navbar-center col-12 col-sm-3'>
                        <a href=''>
                            <img className='logo' src={logo} alt="CodeFusionLogo" />
                        </a>
                    </div>
                    <div className='navbar-center-button'>
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


                    <div className="collapse navbar-collapse navbar-right col-12 col-sm-3" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item nav-item-mod">
                                <a className="nav-link  body-text" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item nav-item-mod">
                                <a className="nav-link  body-text" href="#">
                                    Problems
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link body-text login-icon-link" href="#" >
                                    <MdPerson className="login-icon" />
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Dashboard</a>
                                    <a className="dropdown-item" href="#">Sign Up</a>
                                    <a className="dropdown-item" href="#">Login</a>
                                    <a className="dropdown-item" href="#">Sign Out</a>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Header;