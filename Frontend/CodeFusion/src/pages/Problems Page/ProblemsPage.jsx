import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "./Table";
import "./ProblemsPage.css";
import "./CalendarCard"
import CalendarCard from "./CalendarCard";

function ProblemsPageWithTable() {

  return (
    <Container fluid>
      {/* Cards Section */}
      <section>
        <Container>
          <Row className="my-3">
            {/* Top 50 Card */}
            <Col md={3} className="mb-4">
              <div className="custom-card card text-center text-white card-top50">
                <div className="card-body">
                  <h5 className="card-title">
                    TOP 50 <br /> QUESTIONS
                  </h5>
                  <p className="card-text">
                    Must do list <br /> for interview prep
                  </p>
                  <Link to="/learning" className="btn btn-info custom-button">
                    START LEARNING
                  </Link>
                </div>
              </div>
            </Col>

            {/* Top 75 Card */}
            <Col md={3} className="mb-4">
              <div className="custom-card card text-center text-white card-top75">
                <div className="card-body">
                  <h5 className="card-title">
                    TOP 75 <br /> QUESTIONS
                  </h5>
                  <p className="card-text">
                    Must do list <br /> for interview prep
                  </p>
                  <Link to="/learning" className="btn btn-info custom-button">
                    START LEARNING
                  </Link>
                </div>
              </div>
            </Col>

            {/* Beginner Questions Card */}
            <Col md={3} className="mb-4">
              <div className="custom-card card text-center text-white card-BegQue">
                <div className="card-body">
                  <h5 className="card-title">
                    BEGINNER <br /> QUESTIONS
                  </h5>
                  <p className="card-text">
                    Must do list <br /> for interview prep
                  </p>
                  <Link to="/learning" className="btn btn-info custom-button">
                    START LEARNING
                  </Link>
                </div>
              </div>
            </Col>

            {/* Calendar Card */}
            <Col md={3} className="mb-4">
              <CalendarCard/>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Table Section */}
      <section>
        <Container>
          <Table />
        </Container>
      </section>
    </Container>
  );
}

export default ProblemsPageWithTable;
