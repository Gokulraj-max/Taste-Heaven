import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEdit, faSave, faPrint } from "@fortawesome/free-solid-svg-icons";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Fetch orders on mount
  useEffect(() => {
    // Use full URL if needed: e.g., "http://localhost:5000/api/orders"
    axios.get("http://localhost:5000/api/orders/get/all")
      .then((res) => {
        console.log("Orders fetched:", res.data);
        setOrders(res.data);
        generateChartData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err.response ? err.response.data : err);
        setLoading(false);
      });
  }, []);

  // Generate chart data (monthly orders)
  const generateChartData = (ordersData) => {
    const monthlyCounts = {};
    ordersData.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });
    const labels = Object.keys(monthlyCounts);
    const data = Object.values(monthlyCounts);
    setChartData({
      labels,
      datasets: [{
        label: 'Monthly Orders',
        data,
        backgroundColor: '#007bff'
      }]
    });
  };

  // Handle order status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setUpdatingOrderId(orderId);
    axios.put(`http://localhost:5000/api/orders/status/${orderId}`, { status: newStatus })
      .then((res) => {
        console.log("Order updated:", res.data);
        setUpdatingOrderId(null);
      })
      .catch((err) => {
        console.error("Error updating order:", err.response ? err.response.data : err);
        setUpdatingOrderId(null);
      });
  };

  // Function to print invoices (unchanged)
  const printInvoices = () => {
    let printWindow = window.open('', '_blank');
    if (printWindow) {
      let htmlContent = `
        <html>
          <head>
            <title>Invoices</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .invoice { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; }
              .invoice h2 { margin-top: 0; }
              .invoice table { width: 100%; border-collapse: collapse; }
              .invoice table, .invoice th, .invoice td { border: 1px solid #ddd; }
              .invoice th, .invoice td { padding: 8px; text-align: left; }
            </style>
          </head>
          <body>
            <h1>All Invoices</h1>
      `;
      orders.forEach(order => {
        htmlContent += `
          <div class="invoice">
            <h2>Invoice for Order: ${order.name}</h2>
            <p><strong>User:</strong> ${order.user && order.user.name ? order.user.name : "N/A"}</p>
            <p><strong>Delivery Time:</strong> ${order.estimatedTime}</p>
            <p><strong>Location:</strong> ${order.location}</p>
            <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <h3>Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
        `;
        order.items.forEach(item => {
          htmlContent += `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>$${item.price}</td>
            </tr>
          `;
        });
        htmlContent += `
              </tbody>
            </table>
            <p><strong>Estimated Delivery Time:</strong> ${order.estimatedTime}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        `;
      });
      htmlContent += `
          </body>
        </html>
      `;
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
      };
    } else {
      alert("Unable to open print window. Please allow pop-ups.");
    }
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading Orders...
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2 className="page-title">Orders Management</h2>
        <button className="print-btn" onClick={printInvoices}>
          <FontAwesomeIcon icon={faPrint} /> Print Invoices
        </button>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Order Name</th>
              <th>Delivery Time</th>
              <th>Location</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>





            
            {orders.map(order => (
              <tr key={order._id} className="order-row">
                <td>{order.user && order.user.name ? order.user.name : "N/A"}</td>
                <td>{order.name}</td>
                <td>{order.estimatedTime}</td>
                <td>{order.location}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Process">In Process</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  {updatingOrderId === order._id ? (
                    <FontAwesomeIcon icon={faSpinner} spin title="Saving..." />
                  ) : (
                    <FontAwesomeIcon icon={faSave} title="Save Changes" />
                  )}
                </td>
              </tr>
            ))}





          </tbody>
        </table>
      </div>

      <div className="chart-section">
        <h3>Monthly Orders</h3>
        {chartData ? (
          <div className="chart-container">
          {chartData ? (
            <Bar 
              data={chartData} 
              options={{ maintainAspectRatio: false, responsive: true }}
            />
          ) : (
            <p>No chart data available</p>
          )}
        </div>
        
        ) : (
          <p>No chart data available</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
