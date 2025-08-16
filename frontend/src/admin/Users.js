import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    notifications: false,
    role: "user",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/");
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          generateChartData(response.data.data);
        } else {
          console.error("API response is not an array:", response.data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission for add/update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update user
        const response = await axios.put(
          `http://localhost:5000/api/users/${editingUser._id}`,
          formData
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === editingUser._id ? response.data.data : user
          )
        );
        setIsEditing(false);
        setEditingUser(null);
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          notifications: false,
          role: "user",
        });
        generateChartData(users);
      } else {
        // Add new user
        const response = await axios.post(
          "http://localhost:5000/api/users/",
          formData
        );
        setUsers([...users, response.data.data]);
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          notifications: false,
          role: "user",
        });
        generateChartData([...users, response.data.data]);
      }
    } catch (err) {
      console.error("Error submitting user:", err);
      setError("Failed to submit user. Please try again.");
    }
  };

  // Handle editing a user: pre-fill the form with existing user data
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // leave empty for security reasons – update only if needed
      address: user.address,
      notifications: user.notifications,
      role: user.role,
    });
    setIsEditing(true);
    setEditingUser(user);
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        const filteredUsers = users.filter((user) => user._id !== userId);
        setUsers(filteredUsers);
        generateChartData(filteredUsers);
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user. Please try again.");
      }
    }
  };

  // Generate pie chart data: count new users per month
  const generateChartData = (usersData) => {
    const counts = {};
    usersData.forEach((user) => {
      const month = new Date(user.createdAt).toLocaleString("default", {
        month: "short",
      });
      counts[month] = (counts[month] || 0) + 1;
    });
    const labels = Object.keys(counts);
    const values = Object.values(counts);
    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#007bff",
            "#28a745",
            "#ffc107",
            "#dc3545",
            "#6f42c1",
            "#fd7e14",
            "#20c997",
            "#17a2b8",
            "#343a40",
            "#f8f9fa",
          ],
        },
      ],
    });
  };

  // Filter users by role
  const filterUsersByRole = (role) => {
    if (!Array.isArray(users)) {
      console.error("users is not an array:", users);
      return [];
    }
    return users.filter((user) => user.role === role);
  };

  return (
    <div className="ad-user-container">
      <h2>Manage Users</h2>

      {/* Display error message if any */}
      {error && <p className="ad-user-error">{error}</p>}

      {/* Form for adding/updating a user */}
      <div className="ad-user-form">
        <h3>{isEditing ? "Edit User" : "Add New User"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="ad-user-form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ad-user-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ad-user-form-group">
            <label>{isEditing ? "New Password (optional)" : "Password"}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isEditing ? "Leave blank to keep current" : ""}
              {...(!isEditing && { required: true })}
            />
          </div>
          <div className="ad-user-form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="ad-user-form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="ad-user-form-group ad-user-checkbox-group">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              Receive Notifications
            </label>
          </div>
          <button type="submit" className="ad-user-btn ad-user-btn-success">
            {isEditing ? "Update User" : "Add User"}
          </button>
        </form>
      </div>

      {/* Users list */}
      <div className="ad-user-list">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <>
            <h3 className="tile">Users</h3>
            {filterUsersByRole("user").map((user) => (
              <div key={user._id} className="ad-user-item">
                <h4>{user.name}</h4>
                <p>Email: {user.email}</p>
                <p>Address: {user.address || "N/A"}</p>
                <p>Role: {user.role}</p>
                <p>Notifications: {user.notifications ? "Yes" : "No"}</p>
                <div className="ad-user-actions">
                  <button
                    className="ad-user-btn ad-user-btn-warning"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="ad-user-btn ad-user-btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <h3 className="tile">Admins</h3>
            {filterUsersByRole("admin").map((user) => (
              <div key={user._id} className="ad-user-item">
                <h4>{user.name}</h4>
                <p>Email: {user.email}</p>
                <p>Address: {user.address || "N/A"}</p>
                <p>Role: {user.role}</p>
                <p>Notifications: {user.notifications ? "Yes" : "No"}</p>
                <div className="ad-user-actions">
                  <button
                    className="ad-user-btn ad-user-btn-warning"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="ad-user-btn ad-user-btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Pie chart for monthly new user count */}
      <div className="ad-user-chart-section">
        <h3>New Users (Monthly)</h3>
        {chartData ? (
          <div className="ad-user-chart-container">
            <Pie
              data={chartData}
              options={{ maintainAspectRatio: false, responsive: true }}
            />
          </div>
        ) : (
          <p>No chart data available</p>
        )}
      </div>
    </div>
  );
}

export default Users;