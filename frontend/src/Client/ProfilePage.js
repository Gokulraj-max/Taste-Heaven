import React, { useEffect } from "react";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Adjust the path as needed
import EditProfile from "./EditProfile";
import Address from "./Address";
import Settings from "./Settings";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // Show loading indicator while checking authentication status
  if (loading) {
    return <div className="loading-container">Checking authentication...</div>;
  }

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <ul>
          <li>
            <NavLink
              to="/profile/edit-profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Edit Profile
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/profile/address"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Address
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/profile/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <main className="profile-content">
        <Routes>
          <Route path="edit-profile" element={<EditProfile />} />
          {/* <Route path="address" element={<Address />} /> */}
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default ProfilePage;
