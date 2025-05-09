import axios from "axios";

const Auth_Url="http://localhost:8080/auth";

export const signup=async (userdata)=>{
  try{
    const response =await axios.post(`${Auth_Url}/signup`,userdata);
    return response.data;
  }
  catch(error){
    throw error.response?.data || "Signup failed";
  }
};

export const login =async (userdata)=>{
  try{
    const response=await axios.post(`${Auth_Url}/login`,userdata,{
      withCredentials:true,
    });
    return response.data;
  }
  catch(error){
    throw error.response?.data || "Login failed";
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${Auth_Url}/logoutuser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Logout failed!";
  }
};

export const getSessionUser = async () => {
  try {
    const response = await axios.get(`${Auth_Url}/session-user`, {
      withCredentials: true, // Ensure cookies are included
    });
    return response.data; // This should return user session data, including the user ID
  } catch (error) {
    throw error.response?.data || "Failed to fetch session user data";
  }
};
