import React, { useEffect, useState } from "react";

import man_working1 from "../../assets/images/MainPage/man_working1.jpeg";
import women_working2 from "../../assets/images/MainPage/women_working2.jpeg";
import man_working2 from "../../assets/images/MainPage/man_working2.jpg";
import moving_img2 from "../../assets/images/MainPage/moving_img2.jpg";
import moving_img3 from "../../assets/images/MainPage/moving_img3.webp";
import moving_img4 from "../../assets/images/MainPage/moving_img4.webp";
import boy_thinking from "../../assets/images/MainPage/boy_thinking.jpeg";
import adminDashboard from "../../assets/images/MainPage/adminDashboard.png";
import codeCompiler from "../../assets/images/MainPage/codeCompiler.png";
import userDashboard from "../../assets/images/MainPage/userDashboard.png";
import questions from "../../assets/images/MainPage/questions.png";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  // Array of images to be displayed
  const images = [moving_img2, moving_img3, moving_img4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track the current image index
  useEffect(() => {
    // Change image every 3 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
    }, 3000);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div>
      <Container fluid className="background-container">
        {/* Master Coding Section */}
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-right mb-4">
                <h1>
                  Master coding with <br /> real-time challenges
                </h1>
                <p className="text-16 text-right">
                  Level up your skills with instant feedback and hands-on
                  practice. Collaborate with a vibrant community, tackle
                  real-world coding challenges and transform your ideas into
                  impactful solutions.
                </p>
                <Link to="/signup">
                  <button className="custom-button-blue">Sign Up</button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/problems">
                  <button className="custom-button">Explore</button>
                </Link>
              </Col>
              <Col md={6} className="text-center mb-4">
                {/* Display current image */}
                <img
                  src={images[currentImageIndex]}
                  alt={`Current slide ${currentImageIndex + 1}`}
                  className="img-fluid fade-in-effect"
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Start Exploring Section */}
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-center mb-5">
                <img
                  src={women_working2}
                  alt="Women Working"
                  className="img-fluid"
                />
              </Col>
              <Col md={6} className="text-right mb-4">
                <h1>Start Exploring</h1>
                <p className="text-16 text-right">
                  Code Fusion offers a well-structured path to elevate your
                  coding journey, guiding you step-by-step toward programming
                  excellence and career success.
                </p>
                <Link to="/problems">
                  <button className="custom-button">Explore</button>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Explore Skills Section */}
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-right mb-4">
                <h2>Explore and Expand Your Skills</h2>
                <p className="text-16 text-right">
                  Every great idea starts with a single line of code. Join a
                  global community of developers, sharpen your skills, and
                  prepare for your dream job with curated content and hands-on
                  practice.
                </p>
                <img
                  src={man_working2}
                  alt="Man Working on Cyber Security"
                  className="img-fluid img-1"
                />
              </Col>
              <Col md={6} className="text-right mb-4">
                <h2>Move Beyond Binary Trees</h2>
                <p className="text-16 text-right">
                  Create real-world coding challenges with our library of
                  developer-focused content, designed to prepare users for the
                  problems they’ll face on the job.
                </p>
                <img
                  src={man_working1}
                  alt="Man Working on a Project"
                  className="img-fluid img-2"
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/*------------Section Features----------*/}
        <h2 className="text-center mt-5">FEATURES</h2>
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-center mb-4 features">
                <h2 className="mt-4">
                  🚀 Interactive Coding <br />
                  Challenges
                </h2>
                <p className=" text-16 text-center mt-4">
                  Practice with coding problems designed to simulate real-world
                  scenarios. Whether you’re preparing for interviews or
                  enhancing your skills, we've got you covered.
                </p>
              </Col>
              <Col md={6} className="text-center mb-5">
                <img
                  src={adminDashboard}
                  alt="admin Dashboard"
                  className="img-fluid img-2"
                />
              </Col>
              {/*------------pending screen shorts----------*/}
            </Row>
          </Container>
        </section>
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-center mb-5">
                <img
                  src={questions}
                  alt="questions"
                  className="img-fluid img-2"
                />
              </Col>
              <Col md={6} className="text-center mb-4 features">
                <h2 className="mt-4">
                  💡 Real-Time Code
                  <br /> Execution
                </h2>
                <p className="text-16 text-center mt-4">
                  Run your code instantly in multiple languages, and get
                  immediate feedback to accelerate your learning journey.
                  Collaborate with peers to solve real-world coding challenges.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-16 text-center mb-4 features">
                <h2 className="mt-4">
                  📚 Structured Learning <br />
                  Paths
                </h2>
                <p className="text-16 text-center mt-4">
                  Access well-organized content and challenges to build strong
                  foundations and progress seamlessly toward coding mastery.
                  Stay motivated with real-time feedback and track your growth
                  every step of the way.
                </p>
              </Col>
              <Col md={6} className="text-center mb-5">
                <img
                  src={userDashboard}
                  alt="user Dashboard"
                  className="img-fluid img-2"
                />
              </Col>
              {/*------------pending screen shorts----------*/}
            </Row>
          </Container>
        </section>
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-center mb-5">
                <img
                  src={codeCompiler}
                  alt="codeCompiler"
                  className="img-fluid img-2"
                />
              </Col>
              <Col md={6} className="text-center mb-4 features">
                <h2 className="mt-4">
                  🏆 Job-Ready Practice
                  <br /> Real Results
                </h2>
                <p className="text-16 text-center mt-4">
                  "Solve the problems you’d actually encounter on the job. Code
                  Fusion prepares you for interviews, projects, and real-world
                  development. Gain the confidence to tackle any coding
                  challenge with ease.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        {/*------------Why Choose Code Fusion? Section ---------*/}
        <h1 className="text-center mt-5">Why Choose Code Fusion?</h1>
        <section className="py-5">
          <Container>
            <Row>
              <Col md={6} className="text-16 text-right mb-4 pl-4">
                <ul style={{ fontSize: "1.2rem", listStyleType: "disc" }}>
                  <li>Curated challenges for all skill levels.</li>
                  <li>Instant feedback to improve faster.</li>
                  <li>Hands-on practice to build confidence.</li>
                  <li>Prepare smarter, not harder.</li>
                </ul>
                <Link to="/problems">
                  <button className="custom-button">Explore</button>
                </Link>
              </Col>
              <Col md={6} className="text-center mb-5">
                <img
                  src={boy_thinking}
                  alt="Boy Thinking"
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Add more sections as needed */}
      </Container>
    </div>
  );
}
export default MainPage;
