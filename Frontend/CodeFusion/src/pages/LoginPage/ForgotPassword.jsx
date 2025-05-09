import React, { useState } from "react";
import { forgotPassword, verifyOTP, resetPassword } from "../../utils/UsersApi"; // Ensure these functions are properly implemented in UsersApi.js
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import toast CSS
import { Container, Row, Col, Button, Form } from "react-bootstrap"; // Bootstrap components

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Manage steps for email, OTP, and new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError("");
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const response = await forgotPassword(email); // Call the forgotPassword API
      if (response) {
        toast.success("OTP sent to your email!");
        setStep(2); // Move to OTP verification step
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await verifyOTP(email, otp); // Call the verifyOTP API
      if (response) {
        toast.success("OTP verified successfully!");
        setStep(3); // Move to password reset step
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    try {
      const response = await resetPassword(email, otp, newPassword); // Call the resetPassword API
      if (response) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful password reset
        }, 3000); // Redirect to login page after successful password reset
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={2000} />
      <Row className="justify-content-center forgot-password">
        <Col md={6} sm={12}>
          <h2 className="text-center mb-4">Forgot Password</h2>

          {/* Step 1: Email Form */}
          {step === 1 && (
            <Form onSubmit={handleRequestOtp}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Send OTP
              </Button>
            </Form>
          )}

          {/* Step 2: OTP Verification Form */}
          {step === 2 && (
            <Form onSubmit={handleVerifyOtp}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Verify OTP
              </Button>
            </Form>
          )}

          {/* Step 3: Reset Password Form */}
          {step === 3 && (
            <Form onSubmit={handleResetPassword}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Reset Password
              </Button>
            </Form>
          )}

          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
