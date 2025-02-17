import logo from "../../assets/images/CodeFusionLogo.png";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer py-2">
        <div className="container-fluid">
          <div className="row">
            <div className="footer-ft col-12">
              <div className="img-center">
                <Link to="/">
                  <img
                    className="footer-logo"
                    src={logo}
                    alt="CodeFusionLogo"
                  ></img>
                </Link>
              </div>
            </div>
            <div className="footer-ft col-12">
              <ul>
                <li className="body-text-bold">Quick Links</li>
                <li className="footer-link">
                  <Link to="/">Home</Link>
                </li>
                <li className="footer-link">
                  <Link to="/problems">Problems</Link>
                </li>
                <li className="footer-link">
                  <Link to="/">Why Us?</Link>
                </li>
                <li className="footer-link">
                  <Link to="/">Features</Link>
                </li>
                <li className="footer-link">
                  <Link to="/">Testimonials</Link>
                </li>
              </ul>
            </div>
            <div className="footer-ft col-12">
              <ul>
                <li className="body-text-bold">Project by:</li>
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
  );
}

export default Footer;
