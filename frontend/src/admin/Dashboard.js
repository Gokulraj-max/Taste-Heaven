import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";

function Dashboard() {
  // State for stats
  const [stats, setStats] = useState({
    newOrders: 0,
    User: 0,
    bookings: 0,
  });

  // Chart data
  const [doughnutData, setDoughnutData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [extraBarData, setExtraBarData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);

  // Fetch stats from APIs
  useEffect(() => {
    // Fetch New Orders Count
    axios
      .get("http://localhost:5000/api/orders/count")
      .then((res) => {
        setStats((prevStats) => ({ ...prevStats, newOrders: res.data.count }));
      })
      .catch((err) => console.error("Error fetching orders:", err));

    // Fetch User Registrations Count
    axios
      .get("http://localhost:5000/api/users/user/count")
      .then((res) => {
        setStats((prevStats) => ({ ...prevStats, User: res.data.count }));
      })
      .catch((err) => {
        console.error("Error fetching users:", err.response?.data || err.message);
      });

    // Fetch Bookings (if applicable)
    axios
      .get("http://localhost:5000/api/bookings/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      })
      .then((res) => {
        const totalBookings = res.data.length || 0;
        setStats((prevStats) => ({ ...prevStats, bookings: totalBookings }));
      })
      .catch((err) => console.error("Error fetching bookings:", err));

    // Initialize Doughnut Chart
    setDoughnutData({
      labels: ["Chrome", "Firefox", "Safari"],
      datasets: [
        {
          data: [55, 25, 20],
          backgroundColor: ["#007bff", "#28a745", "#ffc107"],
        },
      ],
    });

    // Initialize Bar Chart (Orders & Users)
    const barChartData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Foods Orders",
          data: [30, 45, 28, 55, 42, 60],
          backgroundColor: "#007bff",
        },
        {
          label: "Service Booking",
          data: [20, 35, 45, 30, 50, 40],
          backgroundColor: "#28a745",
        },
        {
          label: "Users",
          data: [25, 20, 35, 40, 30, 45],
          backgroundColor: "#ffc107",
        },
      ],
    };
    setBarData(barChartData);

    // Initialize Extra Bar Chart (duplicate of Orders & Users)
    setExtraBarData(barChartData);

    // Initialize Monthly Revenue Bar Chart
    setRevenueData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue (in USD)",
          data: [5000, 7000, 6000, 8000, 7500, 9000],
          backgroundColor: "#ff5733",
        },
      ],
    });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1 className="h2">Dashboard</h1>
      </div>

      {/* Cards Row */}
      <div className="row">
        {/* New Orders Card */}
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">New Orders</h5>
              <h2>{stats.newOrders}</h2>
            </div>
          </div>
        </div>

        {/* User Registrations Card */}
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">User Registrations</h5>
              <h2>8</h2>
              <h2>{stats.User}</h2>
            </div>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="col-md-3 mb-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">New Booking</h5>
              <h2>{stats.bookings}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-pie" /> Doughnut Chart
            </div>
            <div className="card-body" style={{ height: "300px" }}>
              {doughnutData ? (
                <Doughnut data={doughnutData} />
              ) : (
                <p>Loading Doughnut Chart...</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-bar" /> 2025 Orders & Users
            </div>
            <div className="card-body" style={{ height: "300px" }}>
              {barData ? (
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              ) : (
                <p>Loading Bar Chart...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Extra Orders & Users Chart Row */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-bar" /> 2024 Orders & Users
            </div>
            <div className="card-body" style={{ height: "300px" }}>
              {extraBarData ? (
                <Bar data={extraBarData} options={{ maintainAspectRatio: false }} />
              ) : (
                <p>Loading Extra Bar Chart...</p>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-line" /> Monthly Revenue
            </div>
            <div className="card-body" style={{ height: "300px" }}>
              {revenueData ? (
                <Bar data={revenueData} options={{ maintainAspectRatio: false }} />
              ) : (
                <p>Loading Revenue Chart...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;