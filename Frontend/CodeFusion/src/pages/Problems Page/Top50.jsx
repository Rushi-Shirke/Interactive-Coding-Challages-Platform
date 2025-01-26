import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Top50.css";

function Table() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    {
      status: "New",
      title: "Construct String With Repeat Limit",
      solution: true,
      difficulty: "Medium",
      frequency: 10,
    },
    {
      status: "Old",
      title: "Final Array State After K Multiplication...",
      solution: true,
      difficulty: "Hard",
      frequency: 5,
    },
    {
      status: "New",
      title: "Two Sum",
      solution: false,
      difficulty: "Easy",
      frequency: 15,
    },
    {
      status: "Old",
      title: "Another Problem",
      solution: true,
      difficulty: "Hard",
      frequency: 3,
    },
    {
      status: "New",
      title: "Palindrome Check",
      solution: false,
      difficulty: "Easy",
      frequency: 8,
    },
    {
      status: "Old",
      title: "Factorial Calculation",
      solution: true,
      difficulty: "Medium",
      frequency: 6,
    },
    {
      status: "New",
      title: "Max Subarray Sum",
      solution: false,
      difficulty: "Hard",
      frequency: 12,
    },
    {
      status: "Old",
      title: "Matrix Multiplication",
      solution: true,
      difficulty: "Medium",
      frequency: 4,
    },
    {
      status: "New",
      title: "Binary Search",
      solution: false,
      difficulty: "Easy",
      frequency: 14,
    },
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="main-container">
      <Row>
        {/* Table Section */}
        <Col md={9} sm={12}>
        <table className="table table-dark table-striped custom-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Solution</th>
                <th>Difficulty</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr key={index}>
                  <td
                    className={
                      row.status === "New" ? "text-info" : "text-warning"
                    }
                  >
                    {row.status}
                  </td>
                  <td>
                    <Link to={`/question/${index}`} className="text-white text-decoration-none">
                      {row.title}
                    </Link>
                  </td>
                  <td>
                    {row.solution ? (
                      <span className="text-success">✔</span>
                    ) : (
                      <span className="text-danger">✖</span>
                    )}
                  </td>
                  <td
                    className={
                      row.difficulty === "Easy"
                        ? "text-success"
                        : row.difficulty === "Medium"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {row.difficulty}
                  </td>
                  <td>{row.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </Col>

        {/* Filter Section */}
        <Col md={3} sm={12}>
          <div className="filter-container p-3">
            <h5 className="text-white">FILTER</h5>
            <ul className="list-unstyled">
              <li className="filter-item">
                <span>Topic</span>
                <i className="bi bi-chevron-down"></i>
              </li>
              <li className="filter-item">
                <span>List</span>
                <i className="bi bi-chevron-down"></i>
              </li>
              <li className="filter-item">
                <span>Difficulty</span>
                <i className="bi bi-chevron-down"></i>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Table;
