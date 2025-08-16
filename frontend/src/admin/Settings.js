import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an AuthContext
import "./Settings.css";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function Settings() {
  const { user } = useAuth(); // Get the authenticated user from context
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Fetch current admin profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token missing. Please log in again.");

        const response = await axios.get(`${API_URL}/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.data;
        setProfile({
          name: userData.name,
          email: userData.email,
          password: "", // Leave blank for security
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage({ text: "Failed to fetch profile data.", type: "error" });
      }
    };

    fetchProfile();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token missing. Please log in again.");

      const updateData = { name: profile.name, email: profile.email };
      if (profile.password) {
        updateData.password = profile.password;
      }

      const response = await axios.put(`${API_URL}/api/users/edit/${user.id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ text: "Profile updated successfully!", type: "success" });
      setProfile((prev) => ({ ...prev, password: "" })); // Clear password field after update
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        text: error.response?.data?.message || "Error updating profile",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      {/* If not editing, show read-only view */}
      {!isEditing ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        // Editable form when in edit mode
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Admin Name</label>
            <input 
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input 
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Settings;