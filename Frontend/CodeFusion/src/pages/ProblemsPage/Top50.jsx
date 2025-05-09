import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { getAllQuestions } from "../../utils/CFapi";
import "./Table.css";

function Top50() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Top50");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "Top50";
    setSelectedCategory(category);
  }, [location.search]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Filter based on selected category
  const filteredByCategory = questions.filter(
    (q) => q.categories === selectedCategory
  );

  // Filter based on difficulty
  const filteredQuestions =
    selectedDifficulty === "All"
      ? filteredByCategory
      : filteredByCategory.filter(
          (q) => q.difficultyLevel === selectedDifficulty
        );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const currentData = filteredQuestions.slice(
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
          <div className="table-wrapper">
            {loading ? (
              <p className="text-center text-white">Loading questions...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              <table className="table table-dark table-striped custom-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Title</th>
                    <th>Solution</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, index) => (
                    <tr key={index}>
                      <td className={row.status ? "text-warning" : "text-info"}>
                        {row.status}
                      </td>
                      <td>
                        <Link
                          to={`/question/${row.id}`}
                          className="text-white text-decoration-none"
                        >
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
                          row.difficultyLevel === "Easy"
                            ? "text-success"
                            : row.difficultyLevel === "Medium"
                            ? "text-warning"
                            : "text-danger"
                        }
                      >
                        {row.difficultyLevel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

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
        <Col md={3} sm={12} className="mb-3">
          <Form>
            <Form.Group controlId="difficultyFilter">
              <Form.Label className="text-white">
                Filter by Difficulty:
              </Form.Label>
              <Form.Select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <option value="All">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Top50;
