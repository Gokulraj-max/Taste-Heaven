import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./AdminDashboard";
import Orders from "./Orders";
import Products from "./Products";
import Services from "./Services";
import Offers from "./Offers";
import Users from "./Users";
import Settings from "./Settings";

function AdminDashboard() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar remains static */}
        <Sidebar />

        {/* Dynamic content area */}
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AdminDashboard;
