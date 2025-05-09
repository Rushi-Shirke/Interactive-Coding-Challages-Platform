import axios from "axios";

// Set up the base URL for your API (adjust accordingly)
const API_URL = "http://localhost:8080/api/user";

// Function to update a user
export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Function to send OTP for forgot password
export const forgotPassword = async (userEmail) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, null, {
      params: { user_email: userEmail },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Function to verify OTP
export const verifyOTP = async (userEmail, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, null, {
      params: { user_email: userEmail, otp: otp },
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

// Function to reset the password
export const resetPassword = async (userEmail, otp, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, null, {
      params: { user_email: userEmail, otp: otp, newPassword: newPassword },
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Function to get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
