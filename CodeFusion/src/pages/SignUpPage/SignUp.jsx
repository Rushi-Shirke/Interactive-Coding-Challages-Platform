import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../utils/authApi";
import { ToastContainer, toast } from "react-toastify";
import "./SignUp.css";
import { Container, Row, Col } from "react-bootstrap";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, userEmail, userPassword } = formData;

    if (!userName || !userEmail || !userPassword) {
      setError("All fields are required.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(userName)) {
      setError("Full Name should contain only letters.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setError("Please enter a valid useremail address.");
      return;
    }

    if (userPassword.length < 6) {
      setError("userPassword must be at least 6 characters long.");
      return;
    }

    try {
      const response = await signup(formData);
      console.log(response);
      setSuccess(true);
      setFormData({ userName: "", userEmail: "", userPassword: "" });
      toast.success("Signup successfull!");
      setTimeout(() => {
        navigate("/login"); // Redirect after login
      }, 3000);
    } catch (error) {
      toast.error("Signup Failed. Please try again.");
      // setError(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div>
      <Container fluid className="background-container">
        <ToastContainer position="top-right" autoClose={2000} />
        <Container className="main-section">
          <Row>
            <Col md={6}>
              <img
                src="src/assets/images/SignUp_Gif.gif"
                alt="SignUp Gif"
                className="gif-image"
              />
            </Col>
            <Col md={6}>
              <div className="custom-div">
                <h2>
                  JOIN US <br />
                  AND CREATE A <span className="highlight">
                    CODE FUSION
                  </span>{" "}
                  ACCOUNT
                </h2>
              </div>

              <div className="form-box">
                <form className="Signup-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="userName"
                    className="form-input"
                    placeholder="Full Name"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="userEmail"
                    className="form-input"
                    placeholder="User Email"
                    value={formData.userEmail}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="Password"
                    name="userPassword"
                    className="form-input"
                    placeholder="User Password"
                    value={formData.userPassword}
                    onChange={handleChange}
                    required
                  />
                  {/* {error && <p className="error-message">{error}</p>}
                  {success && (
                    <p className="success-message">Sign-up successful!</p>
                  )} */}
                  <div className="button-container">
                    <button type="submit" className="custom-button-blue">
                      SIGN UP
                    </button>
                    <Link to="/login">
                      <button type="submit" className="custom-button">
                        LOGIN
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default SignUp;
