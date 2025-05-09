import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getSessionUser } from "../../utils/authApi";
import { getUserLeaderboard } from "../../utils/leaderboardApi";
import "./UsersTable.css";

function UsersTable() {
  const [challenges, setChallenges] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Fetch user ID and challenge data
  useEffect(() => {
    const fetchUserAndChallenges = async () => {
      setLoading(true);
      try {
        // Get session user details
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
          setError("User not found.");
          setLoading(false);
          return;
        }

        setUserId(sessionUser.userId); // Ensure correct key is used

        // Fetch leaderboard data
        const leaderboardData = await getUserLeaderboard(sessionUser.userId);
        if (!leaderboardData || leaderboardData.length === 0) {
          setError("No challenges found.");
          setChallenges([]);
          return;
        }

        setChallenges(leaderboardData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndChallenges();
  }, []);

  // **Fix: Filtering by correct property**
  const filteredChallenges =
    selectedDifficulty === "All"
      ? challenges
      : challenges.filter(
          (c) => c.difficultyLevel?.level === selectedDifficulty
        );

  // **Fix: Reset to page 1 when filtered challenges change**
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredChallenges.length]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredChallenges.length / itemsPerPage)
  );

  const currentData = filteredChallenges.slice(
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
              <p className="text-center text-white">Loading challenges...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : challenges.length === 0 ? (
              <p className="text-center text-white">No challenges found.</p>
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
                  {currentData.map((challenge, index) => (
                    <tr key={index}>
                      {/* Status Column */}
                      <td
                        className={
                          challenge.status ? "text-success" : "text-danger"
                        }
                      >
                        {challenge.status ? "Solved" : "Unsolved"}
                      </td>

                      {/* Title Column */}
                      <td>
                        <Link
                          to={`/question/${challenge.challengeId}`}
                          className="text-white text-decoration-none"
                        >
                          {challenge.challengeTitle}
                        </Link>
                      </td>

                      {/* Solution Column */}
                      <td>
                        {challenge.solution ? (
                          <span className="text-success">✔</span>
                        ) : (
                          <span className="text-danger">✖</span>
                        )}
                      </td>

                      {/* Difficulty Column */}
                      <td
                        className={
                          challenge.difficultyLevel?.level === "Easy"
                            ? "text-success"
                            : challenge.difficultyLevel?.level === "Medium"
                            ? "text-warning"
                            : "text-danger"
                        }
                      >
                        {challenge.difficultyLevel?.level || "Unknown"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {challenges.length > 0 && totalPages > 1 && (
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
          )}
        </Col>

        {/* Filter Section */}
        <Col md={3} sm={12}>
          <div className="filter-container p-3">
            <h5 className="text-white">FILTER</h5>
            <label className="text-white">Select Difficulty:</label>
            <select
              className="form-select mt-2"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UsersTable;
