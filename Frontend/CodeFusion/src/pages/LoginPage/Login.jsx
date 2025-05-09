import React, { useState, useEffect } from "react";
import { login, getSessionUser } from "../../utils/authApi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userEmail || !formData.userPassword) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await login(formData);
      console.log("Login Successful:", response);
      setSuccess(true);
      toast.success("Login successful!");

      setTimeout(async () => {
        try {
          const userData = await getSessionUser();
          console.log("User ID:", userData.userId, userData.userName); // ✅ Print userId after login
          setUser(userData); // ✅ Store in state
        } catch (error) {
          console.error("Error fetching session user:", error);
        }

        // 🔹 Step 3: Redirect to dashboard
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getSessionUser();
        console.log("Session User:", userData); // Logs session data
        setUser(userData);
      } catch (error) {
        console.error("Error fetching session user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Container fluid className="background-container">
        <ToastContainer position="top-right" autoClose={2000} />
        <Container className="main-section">
          <Row>
            <Col md={6} sm={12}>
              <img
                src="src/assets/images/Login_Gif.gif"
                alt="Login Gif"
                className="gif-image"
              />
            </Col>
            <Col md={6} sm={12}>
              <div className="custom-div">
                <h1>
                  WELCOME BACK!
                  <br />
                  LOGIN TO YOUR ACCOUNT...
                </h1>
              </div>

              <div className="form-box">
                <form className="Signup-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="userEmail"
                    className="form-input"
                    placeholder="Email"
                    value={formData.userEmail}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="userPassword"
                    className="form-input"
                    placeholder="Password"
                    value={formData.userPassword}
                    onChange={handleChange}
                    required
                  />
                  <Link className="text-primary" to="/forgetPassword">
                    Forget Password ?
                  </Link>
                  <div className="button-container">
                    <button type="submit" className="custom-button-blue">
                      LOG IN
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/signup">
                      <button type="button" className="custom-button">
                        SIGN UP
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

export default Login;
