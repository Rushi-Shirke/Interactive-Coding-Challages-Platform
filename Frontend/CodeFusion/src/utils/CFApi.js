import axios from "axios";

const CFAPI = axios.create({
  baseURL: "http://localhost:8080/api/challenges",
});

// API Calls

// Get all questions
export const getAllQuestions = async () => {
  try {
    const response = await CFAPI.get("/allchallenges");
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Get question by ID
export const getQuestionById = async (id) => {
  try {
    const response = await CFAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question with ID ${id}:`, error);
    throw error;
  }
};

// Add new question
export const addQuestion = async (questionData) => {
  try {
    const response = await CFAPI.post("/save", questionData);
    return response.data;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

// Delete question
export const deleteQuestion = async (id) => {
  try {
    const response = await CFAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting question with ID ${id}:`, error);
    throw error;
  }
};

// Update question
export const updateQuestion = async (id, updatedData) => {
  try {
    const response = await CFAPI.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating question with ID ${id}:`, error);
    throw error;
  }
};

//Get question type
export const getQuestionType = async () => {
    try {
      const response = await CFAPI.get("/questionTypes");
      return response.data;
    } catch (error) {
      console.error("Error fetching question types:", error);
      throw error;
    }
  };

 // Get question categories from API
export const getCategoryType = async () => {
    try {
      const response = await CFAPI.get("/categories"); 
      return response.data;
    } catch (error) {
      console.error("Error fetching category types:", error);
      throw error;
    }
  };


  
  


export default CFAPI;
