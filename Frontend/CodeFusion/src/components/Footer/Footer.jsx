import React from 'react';
import logo from '../../assets/images/CodeFusionLogo.png';
import './Footer.css'

function Footer() {
    return (
        <>
            <footer className='footer py-2'>
                <div className="container-fluid">
                    <div className='row'>


                        <div className="footer-ft col-12 d-flex justify-content-center align-items-center">
                            <a href=''>
                                <img className='footer-logo' src={logo} alt='CodeFusionLogo'></img>
                            </a>
                        </div>
                        <div className="footer-ft col-12">
                            <ul>
                                <li className='body-text-bold'>Quick Links</li>
                                <li className='footer-link'><a href=''>Home</a></li>
                                <li className='footer-link'><a href=''>Problems</a></li>
                                <li className='footer-link'><a href=''>Why Us?</a></li>
                                <li className='footer-link'><a href=''>Features</a></li>
                                <li className='footer-link'><a href=''>Testimonials</a></li>
                            </ul>

                        </div>
                        <div className="footer-ft col-12">

                            <ul>
                                <li className='body-text-bold'>Project by:</li>
                                <li>Jyoti Mall</li>
                                <li>Mukul Tanwar</li>
                                <li>Rushikesh Shirke</li>
                                <li>Tushar Dhawale</li>
                                <li>Pawan Yadav</li>

                            </ul>
                        </div>

                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer