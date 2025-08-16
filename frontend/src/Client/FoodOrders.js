// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "./FoodOrders.css";
// import img1 from "../assets/images/pizza.jpg";
// import img2 from "../assets/images/burger.jpg";

// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// const FoodOrders = () => {
//   const [orders, setOrders] = useState([]); // Default value is an empty array
//   const { user, loading: authLoading } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (authLoading) return;
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     // const fetchOrders = async () => {
//     //   try {
//     //     const token = localStorage.getItem("token");
//     //     if (!token) throw new Error("Token missing. Please log in again.");

//     //     const { data } = await axios.get(`${API_URL}/api/foodOrders`, {
//     //       headers: { Authorization: `Bearer ${token}` },
//     //     });

//     //     // Ensure that data is an array
//     //     if (Array.isArray(data)) {
//     //       setOrders(data);
//     //     } else {
//     //       setOrders([]); // If not an array, reset orders to an empty array
//     //       setError("Received invalid data format for orders.");
//     //     }
//     //   } catch (error) {
//     //     if (error.response?.status === 401) {
//     //       // Token expired or invalid
//     //       toast.error("Session expired. Please log in again.");
//     //       localStorage.removeItem("token"); // Remove expired token
//     //       navigate("/login"); // Redirect to login page
//     //     } else {
//     //       setError(error.response?.data?.message || "Failed to load orders.");
//     //     }
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Token missing. Please log in again.");
    
//         const { data } = await axios.get(`${API_URL}/api/foodOrders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
    
//         console.log("API Response Data:", data); // Check the structure of the API response
    
//         if (data && Array.isArray(data)) {
//           setOrders(data); // If it's an array, set it as orders
//         } else if (data && data.orders && Array.isArray(data.orders)) {
//           setOrders(data.orders); // If the response has orders key, use it
//         } else {
//           setOrders([]); // If neither, set an empty array
//           setError("Received invalid data format for orders.");
//         }
//       } catch (error) {
//         if (error.response?.status === 401) {
//           toast.error("Session expired. Please log in again.");
//           localStorage.removeItem("token");
//           navigate("/login");
//         } else {
//           setError(error.response?.data?.message || "Failed to load orders.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
    
    

//     fetchOrders();
//   }, [authLoading, user, navigate]);

//   const handleCancelOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order? ₹50 Cancellation Fee will apply.")) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.put(
//         `${API_URL}/api/foodOrders/cancel/${orderId}`,  // Corrected URL
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success("Order canceled successfully. ₹50 Cancellation Fee applied.");
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId
//             ? { ...order, status: "Canceled", totalAmount: data.updatedOrder.totalAmount }
//             : order
//         )
//       );
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to cancel order. Please try again.");
//     }
//   };

//   if (authLoading) return <p className="loading-text">Checking authentication...</p>;
//   if (!user) return null;

//   return (
//     <div className="food-orders">
//       <h1 className="title">Your Food Orders</h1>
//       {loading ? (
//         <p className="loading-text">Loading orders...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="no-orders">No active food orders.</p>
//       ) : (
//         <div className="food-order-list">
//           {orders.map((order) => (
//             <div className={`food-card ${order.status.toLowerCase()}`} key={order._id}>
//               <img
//                 src={order.image || (order.name.includes("Pizza") ? img1 : img2)}
//                 alt={order.name}
//                 className="food-image"
//               />
//               <h3>{order.name}</h3>
//               <p>
//                 Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
//               </p>
//               <p>Estimated Time: {order.estimatedTime}</p>
//               <p>Location: {order.location}</p>
//               <p>Total Amount: ₹{order.totalAmount}</p>
//               {order.status !== "Canceled" && order.status !== "Completed" && (
//                 <button className="cancel-btn" onClick={() => handleCancelOrder(order._id)}>
//                   Cancel
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodOrders;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "./FoodOrders.css";
// import img1 from "../assets/images/pizza.jpg";
// import img2 from "../assets/images/burger.jpg";

// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// const FoodOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const { user, loading: authLoading } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (authLoading) return;
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     // const fetchOrders = async () => {
//     //   try {
//     //     const token = localStorage.getItem("token");
//     //     if (!token) throw new Error("Token missing. Please log in again.");

//     //     const { data } = await axios.get(`${API_URL}/api/foodOrders/`, {
//     //       headers: { Authorization: `Bearer ${token}` },
//     //     });

//     //     if (data && Array.isArray(data)) {
//     //       setOrders(data);
//     //     } else if (data && data.orders && Array.isArray(data.orders)) {
//     //       setOrders(data.orders);
//     //     } else {
//     //       setOrders([]);
//     //       setError("Received invalid data format for orders.");
//     //     }
//     //   } catch (error) {
//     //     if (error.response?.status === 401) {
//     //       toast.error("Session expired. Please log in again.");
//     //       localStorage.removeItem("token");
//     //       navigate("/login");
//     //     } else {
//     //       setError(error.response?.data?.message || "Failed to load orders.");
//     //     }
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Token missing. Please log in again.");
    
//         const { data } = await axios.get(`${API_URL}/api/foodOrders/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
    
//         if (data && Array.isArray(data)) {
//           setOrders(data);
//         } else if (data && data.orders && Array.isArray(data.orders)) {
//           setOrders(data.orders);
//         } else {
//           setOrders([]);
//           setError("Received invalid data format for orders.");
//         }
//       } catch (error) {
//         if (error.response?.status === 401) {
//           toast.error("Session expired. Please log in again.");
//           localStorage.removeItem("token");
//           navigate("/login");
//         } else {
//           setError(error.response?.data?.message || "Failed to load orders.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [authLoading, user, navigate]);

//   const handleCancelOrder = async (orderId, paymentMethod) => {
//     const wantToCancel = window.confirm("Are you sure you want to cancel this order?");
//     if (!wantToCancel) return;

//     const isOnlinePayment = paymentMethod === "Online";
//     const message = isOnlinePayment
//       ? "₹50 Cancellation Fee will apply. Do you still want to cancel?"
//       : "Do you still want to cancel this order?";

//     const confirmCancel = window.confirm(message);
//     if (!confirmCancel) return;

//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.put(
//         `${API_URL}/api/foodOrders/cancel/${orderId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success("Order canceled successfully.");
//       if (isOnlinePayment) {
//         toast.info("Refund will be processed within 2 hours.");
//       }

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId
//             ? { ...order, status: "Canceled", totalAmount: data.updatedOrder.totalAmount }
//             : order
//         )
//       );
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to cancel order. Please try again.");
//     }
//   };

//   if (authLoading) return <p className="loading-text">Checking authentication...</p>;
//   if (!user) return null;

//   return (
//     <div className="food-orders">
//       <h1 className="title">Your Food Orders</h1>
//       {loading ? (
//         <p className="loading-text">Loading orders...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="no-orders">No active food orders.</p>
//       ) : (
//         <div className="food-order-list">
//           {orders.map((order) => (
//             <div className={`food-card ${order.status.toLowerCase()}`} key={order._id}>
//               <img
//                 src={order.image || (order.name.includes("Pizza") ? img1 : img2)}
//                 alt={order.name}
//                 className="food-image"
//               />
//               <h3>{order.name}</h3>
//               <p>
//                 Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
//               </p>
//               <p>Estimated Time: {order.estimatedTime}</p>
//               <p>Location: {order.location}</p>
//               <p>Total Amount: ₹{order.totalAmount}</p>
//               {order.status !== "Canceled" && order.status !== "Completed" && (
//                 <button className="cancel-btn" onClick={() => handleCancelOrder(order._id, order.paymentMethod)}>
//                   Cancel
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodOrders;
// FoodOrders.js (Frontend)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./FoodOrders.css";
import img1 from "../assets/images/pizza.jpg";
import img2 from "../assets/images/burger.jpg";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const FoodOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token missing. Please log in again.");
  
        const { data } = await axios.get(`${API_URL}/api/foodOrders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Backend response:", data); // Debugging: Log the response
  
        if (data && data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
          setError("Received invalid data format for orders.");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(error.response?.data?.message || "Failed to load orders.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [authLoading, user, navigate]);

  const handleCancelOrder = async (orderId, paymentMethod) => {
    const wantToCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!wantToCancel) return;

    const isOnlinePayment = paymentMethod === "Online";
    const message = isOnlinePayment
      ? "₹50 Cancellation Fee will apply. Do you still want to cancel?"
      : "Do you still want to cancel this order?";

    const confirmCancel = window.confirm(message);
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/api/foodOrders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Order canceled successfully.");
      if (isOnlinePayment) {
        toast.info("Refund will be processed within 2 hours.");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: "Canceled", totalAmount: data.updatedOrder.totalAmount }
            : order
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order. Please try again.");
    }
  };

  if (authLoading) return <p className="loading-text">Checking authentication...</p>;
  if (!user) return null;

  return (
    <div className="food-orders">
      <h1 className="title">Your Food Orders</h1>
      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">No active food orders.</p>
      ) : (
        <div className="food-order-list">
          {orders.map((order) => (
            <div className={`food-card ${order.status.toLowerCase()}`} key={order._id}>
              <img
                src={order.image || (order.name.includes("Pizza") ? img1 : img2)}
                alt={order.name}
                className="food-image"
              />
              <h3>{order.name}</h3>
              <p>
                Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </p>
              <p>Estimated Time: {order.estimatedTime}</p>
              <p>Location: {order.location}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              {order.status !== "Canceled" && order.status !== "Completed" && (
                <button className="cancel-btn" onClick={() => handleCancelOrder(order._id, order.paymentMethod)}>
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodOrders;