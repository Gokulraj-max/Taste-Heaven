import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Address.css";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Address = () => {
  const { user, setUser, authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    setAddress(user.address || "");

    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token missing. Please log in again.");

        const response = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (!user.address) {
      fetchAddress();
    }
  }, [user, authLoading, navigate]);

  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing.");

      const response = await axios.put(
        `${API_URL}/api/users/update-address`,
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ text: response.data.message, type: "success" });

      // Update user in AuthContext
      setUser({ ...user, address });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Error updating address",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <p className="loading-text">Checking authentication...</p>;
  if (!user) return <p className="error-message">Redirecting to login...</p>;

  return (
    <div className="address-container">
      <h2 className="address-title">Update Address</h2>

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      <form onSubmit={handleAddressUpdate} className="address-form">
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-input"
          required
        />
        <button type="submit" className="update-button" disabled={loading}>
          {loading ? "Updating..." : "Update Address"}
        </button>
      </form>
    </div>
  );
};

export default Address;
