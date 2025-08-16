import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const EditProfile = () => {
  const { user, setUser, authLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token missing. Please log in again.");

        const response = await axios.get(`${API_URL}/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.data;
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPhoneNumber(userData.phoneNumber || "+91");
        setAddress(userData.address || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage({ text: "Failed to fetch user details.", type: "error" });
      }
    };

    fetchUserData();
  }, [authLoading, navigate, user]);

  const validatePhoneNumber = (phone) => {
    const regex = /^\+91[6-9]\d{9}$/;
    return regex.test(phone);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (phoneNumber.trim() && phoneNumber !== "+91" && !validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid Indian phone number.");
      setLoading(false);
      return;
    } else {
      setPhoneError("");
    }

    const updateData = { name, email, address };
    if (phoneNumber.trim() !== "" && phoneNumber !== "+91") {
      updateData.phoneNumber = phoneNumber;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/api/users/edit/${user.id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ text: "Profile updated successfully!", type: "success" });
      setUser((prevUser) => ({ ...prevUser, ...updateData }));
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

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("+91")) {
      setPhoneNumber("+91");
      return;
    }
    if (value.length > 13) return;
    setPhoneNumber(value);
  };

  if (authLoading) return <p className="loading-text">Checking authentication...</p>;
  if (!user) return <p className="error-message">Redirecting to login...</p>;

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      <form onSubmit={handleUpdate} className="edit-profile-form">
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="+91XXXXXXXXXX" />
        {phoneError && <p className="error-message">{phoneError}</p>}

        <label>Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <button type="submit" className="update-button" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;