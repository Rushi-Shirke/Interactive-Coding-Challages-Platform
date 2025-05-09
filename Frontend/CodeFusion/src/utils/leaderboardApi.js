import axios from "axios";

const LBAPI = axios.create({
  baseURL: "http://localhost:8080/api/usercode",
});

// ✅ Function to Fetch Leaderboard Data for a User
export const getUserLeaderboard  = async (userId) => {
  try {
    const response = await LBAPI.get(`/leaderboard/${userId}`);
    return response.data; // Return the leaderboard data
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error; // Rethrow error for handling in UI
  }
};

export const submitCode = async (userId, challengeId, code) => {
  try {
    const response = await LBAPI.post("/submit", {
      user: { userId },
      challenge: { id: challengeId },
      code: code,
      
    });
    return response.data; // Return the response message
  } catch (error) {
    console.error("Error submitting code:", error);
    throw error; // Rethrow error for handling in UI
  }
};

// ✅ Function to Get Submission by userId & questionId
export const getSubmission = async (userId, questionId) => {
  try {
    const response = await LBAPI.get(`/usercode/${userId}/${questionId}`);
    return response.data; // Return the submission data
  } catch (error) {
    console.error("Error fetching submission data:", error);
    throw error; // Rethrow error for handling in UI
  }
};
