import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./ChangePassword.css";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "danger", text: "New passwords do not match!" });
      return;
    }
    setMessage({ type: "success", text: "Password changed successfully!" });
  };

  return (
    <Container className="change-password-container">
      <Row className="justify-content-center">
        <Col md={6} sm={12} className="form-container">
          <h3 className="text-center">Change Password</h3>
          {message && <Alert variant={message.type}>{message.text}</Alert>}
          <Form onSubmit={handleChangePassword}>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
