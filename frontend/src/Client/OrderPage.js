// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext"; // Ensure correct path
// import "./OrderPage.css";
// import img1 from "../assets/images/Order.jpg";
// import img2 from "../assets/images/services.jpg";

// const OrderPage = () => {
//   const navigate = useNavigate();
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     if (!loading && !user) {
//       console.log("🔴 User not found, redirecting to login...");
//       navigate("/login");
//     }
//   }, [user, loading, navigate]);

//   // Show loading indicator while checking authentication status
//   if (loading) {
//     return <p className="loading-text">Checking authentication...</p>;
//   }

//   // Ensure the page renders only when the user is authenticated
//   if (!user) return null;

//   return (
//     <div className="order-container">
//       <h1 className="order-title">Order Tracking</h1>

//       <div className="order-grid">
//         {/* Food Orders Tile */}
//         <div
//           className="order-card"
//           onClick={() => navigate("/foodOrders")}
//           role="button"
//           tabIndex={0}
//         >
//           <img src={img1} alt="Food Orders" className="order-image" />
//           <h2 className="order-heading">Food Orders</h2>
//           <p className="order-description">
//             Track your food delivery and cancel if needed.
//           </p>
//         </div>

//         {/* Service Bookings Tile */}
//         <div
//           className="order-card"
//           onClick={() => navigate("/service-orders")}
//           role="button"
//           tabIndex={0}
//         >
//           <img src={img2} alt="Service Bookings" className="order-image" />
//           <h2 className="order-heading">Service Bookings</h2>
//           <p className="order-description">
//             View your booked services and their details.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Ensure correct path
import "./OrderPage.css";
import img1 from "../assets/images/FoodOrders.jpeg";
import img2 from "../assets/images/ServiceType.jpeg";

const OrderPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      console.log("🔴 User not found, redirecting to login...");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Show loading indicator while checking authentication status
  if (loading) {
    return <p className="auth-checking">Checking authentication...</p>;
  }

  // Ensure the page renders only when the user is authenticated
  if (!user) return null;

  return (
    <div className="tracking-container">
      <h1 className="tracking-title">Order Tracking</h1>

      <div className="tracking-grid">
        {/* Food Orders Tile */}
        <div
          className="tracking-card"
          onClick={() => navigate("/foodOrders")}
          role="button"
          tabIndex={0}
        >
          <img src={img1} alt="Food Orders" className="tracking-image" />
          <h2 className="tracking-heading">Food Orders</h2>
          <p className="tracking-description">
            Track your food delivery and cancel if needed.
          </p>
        </div>

        {/* Service Bookings Tile */}
        <div
          className="tracking-card"
          onClick={() => navigate("/service-orders")}
          role="button"
          tabIndex={0}
        >
          <img src={img2} alt="Service Bookings" className="tracking-image" />
          <h2 className="tracking-heading">Service Bookings</h2>
          <p className="tracking-description">
            View your booked services and their details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
