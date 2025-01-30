import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { Container, Row, Col } from "react-bootstrap";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      setError("Full Name should contain only letters.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Simulate a successful sign-up
    setSuccess(true);
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div>
      <Container fluid className="background-container">
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
                    name="username"
                    className="form-input"
                    placeholder="Full Name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {error && <p className="error-message">{error}</p>}
                  {success && (
                    <p className="success-message">Sign-up successful!</p>
                  )}
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
