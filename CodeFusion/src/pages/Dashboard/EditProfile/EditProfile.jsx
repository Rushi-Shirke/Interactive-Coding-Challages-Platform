import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "../../../utils/UsersApi";
import "./EditProfile.css";

const EditProfile = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    userImage: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Assuming you fetch the user's current data from localStorage or an API
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser({
        email: userData.email,
        username: userData.username,
        password: "", // Password will be entered
        userImage: userData.userImage,
      });
      setImagePreview(userData.userImage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setUser({
        ...user,
        userImage: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("password", user.password);
      if (user.userImage) {
        formData.append("userImage", user.userImage);
      }

      const updatedUser = await updateUser(user.email, formData); // Use the updateUser function to send data to the API
      toast.success("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Update the localStorage with new user data
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 edit-profile">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            className="form-control"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userImage" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            id="userImage"
            name="userImage"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="img-thumbnail mt-3"
              style={{ width: "150px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
