import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./QuestionsTable.css";
import { getAllQuestions, deleteQuestion } from "../../utils/CFapi";

function UsersTable({ difficultyFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 7;

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [difficultyFilter]);

  // Memoized Filtered Data
  const filteredData = useMemo(() => {
    return difficultyFilter
      ? questions.filter((item) => item.difficulty === difficultyFilter)
      : questions;
  }, [questions, difficultyFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete Question
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      await deleteQuestion(id);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question.");
    }
  };

  // Edit Question
  const handleEdit = (id) => {
    navigate(`/admindashboard/editQuestion/${id}`);
  };

  return (
    <Container fluid className="main-container my-3">
      <Link to="/admindashboard/addQuestion">
        <button className="btn btn-primary my-3">Add Question</button>
      </Link>

      {/* Loading and Error Handling */}
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <Row>
          <Col md={12} sm={12}>
            <div className="table-wrapper">
              <table className="table table-dark table-striped custom-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Solution</th>
                    <th>Difficulty</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row) => (
                    <tr key={row.id}>
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
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(row.id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
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
                        onClick={() => setCurrentPage(index + 1)}
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
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default UsersTable;
