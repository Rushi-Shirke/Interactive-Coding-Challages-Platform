import React from 'react';
import './Login.css';
import { Container, Row, Col } from 'react-bootstrap';

const Login = () => {
  return (
    <div>
      <Container fluid className="background-container">
        <Container className="main-section">
          <Row>
            <Col md={6} sm={12}> <img src="src/assets/images/Login_Gif.gif" alt="Login_Gif.gif" className="gif-image" />
            </Col>
            <Col md={6} sm={12}>
            <div className="custom-div">
            <h1>
                  WELCOME BACK!<br></br>LOGIN TO YOUR 
                   ACCOUNT...
                </h1>
              </div>

              <div class="form-box">
   
    <form class="Signup-form">
      <input
        type="email"
        class="form-input"
        placeholder="Email"
        required
      />
      <input
        type="password"
        class="form-input"
        placeholder="Password"
        required
      />
      <div class="button-container">
        <button type="submit" class="custom-button login">LOG IN</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="SignUp.jsx" class="custom-button signup">SIGN UP</a>
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
