import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./Settings.css";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchNotificationSetting = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Authentication required.");
          return;
        }

        const response = await axios.get(`${API_URL}/api/users/notifications/fetch/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications(response.data.data.notifications || false);
      } catch (error) {
        console.error("Failed to fetch notification setting:", error);
        setMessage("Error fetching notification settings.");
      }
    };

    fetchNotificationSetting();
  }, [user]);

  const handleNotificationToggle = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication required.");
        return;
      }

      const newNotifyStatus = !notifications; // Toggle between true and false
      setNotifications(newNotifyStatus); // Optimistic UI update

      console.log("🔹 Sending data to backend:", { notifications: newNotifyStatus });

      const response = await axios.put(
        `${API_URL}/api/users/notifications/${user.id}`,
        { notifications: newNotifyStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Backend response:", response.data);

      if (response.data.success) {
        setMessage("Notification setting updated!");
      } else {
        setMessage("Failed to update notification setting.");
      }
    } catch (error) {
      console.error("❌ Error updating notification setting:", error);
      setMessage("Failed to update notification setting.");
      setNotifications(!notifications); // Revert UI if failed
    }
  };

  return (
    <div>
      <label className="toggle-label">
        <input type="checkbox" checked={notifications} onChange={handleNotificationToggle} />
        Enable Offer Notifications
      </label>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
