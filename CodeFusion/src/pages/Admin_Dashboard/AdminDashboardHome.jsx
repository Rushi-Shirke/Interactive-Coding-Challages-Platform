import React from "react";
import "./AdminDashboard.css";
import "./AdminDashboardHome.css";
import UsersTable from "./AdminUsersTable";
import { Container, Row, Col } from "react-bootstrap";

function AdminDashboardHome() {
  return (
    <Container fluid>
      {/* Statistics Section */}
      <section className="statistics">
        <Row className="total">
          <Col xs={12}>
            <h4 className="text-center">Total Questions Solved</h4>
            <h2 className="body-text text-center">12</h2>
          </Col>
        </Row>

        <Row className="mt-3 d-flex dificulty">
          <Col xs={12} md={4} className="total">
            <h4 className="text-center">Hard</h4>
            <h2 className="body-text text-center">00</h2>
          </Col>
          <Col xs={12} md={4} className="total">
            <h4 className="text-center">Medium</h4>
            <h2 className="body-text text-center">00</h2>
          </Col>
          <Col xs={12} md={4} className="total">
            <h4 className="text-center">Easy</h4>
            <h2 className="body-text text-center">01</h2>
          </Col>
        </Row>
      </section>

      {/* UsersTable Section */}
      <section>
        <Container>
          <UsersTable />
        </Container>
      </section>
    </Container>
  );
}

export default AdminDashboardHome;
