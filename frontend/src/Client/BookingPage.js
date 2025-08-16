// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from "../contexts/AuthContext"; // Adjust the path as needed
// import './booking.css';

// const BookingPage = () => {
//   const { serviceType } = useParams();
//   const navigate = useNavigate();
//   const { user, loading } = useAuth();

//   const [formData, setFormData] = useState({});
//   const [paymentMethod, setPaymentMethod] = useState("Cash"); // Online payment disabled
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);
//   const [diningTables, setDiningTables] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

//   const cities = [
//     "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem",
//     "Tirunelveli", "Erode", "Vellore", "Dindigul", "Tiruppur",
//     "Thanjavur", "Kanchipuram", "Nagercoil", "Cuddalore", "Arakkonam"
//   ];

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login");
//     }
//   }, [user, loading, navigate]);

//   useEffect(() => {
//     if (serviceType === "family-dining") {
//       const fetchDiningTables = async () => {
//         try {
//           const response = await fetch('/api/get-available-tables');
//           const data = await response.json();
//           setDiningTables(data.tables);
//         } catch (error) {
//           console.error("Error fetching dining tables:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchDiningTables();
//     } else {
//       setIsLoading(false);
//     }
//   }, [serviceType]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDiningTableSelect = (e) => {
//     const tableName = e.target.value;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       diningTable: tableName, // Add dining table to formData
//     }));

//     setDiningTables((prevTables) =>
//       prevTables.map((table) =>
//         table.name === tableName ? { ...table, available: false } : table
//       )
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     setIsSubmitting(true); // Set the submission state to true
  
//     try {
//       const response = await fetch('/api/book', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ serviceType, formData, paymentMethod }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         setBookingConfirmed(true);
//         setTimeout(() => {
//           navigate("/service-orders");
//         }, 2000);
//       } else {
//         alert(data.message || 'Error booking the service');
//         console.error("🚨 Booking failed:", data.message);
//       }
//     } catch (error) {
//       alert('Error booking the service');
//       console.error("❌ Error during booking request:", error);
//     } finally {
//       setIsSubmitting(false); // Reset the submission state
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h1>Booking for {serviceType.replace("-", " ").toUpperCase()}</h1>
//       <form onSubmit={handleSubmit}>
//         {serviceType === "birthday" && (
//           <>
//             <label>Number of Guests:</label>
//             <input type="number" name="guests" onChange={handleChange} min="1" required />
//             <label>Cake Size (Kg):</label>
//             <input type="number" name="cakeSize" onChange={handleChange} min="0" required />
//             <label>Cake Type:</label>
//             <select name="cakeType" onChange={handleChange}>
//               <option>Chocolate</option>
//               <option>Vanilla</option>
//               <option>Strawberry</option>
//             </select>
//           </>
//         )}

//         {serviceType === "catering" && (
//           <>
//             <label>Event Type:</label>
//             <select name="eventType" onChange={handleChange}>
//               <option>Wedding</option>
//               <option>Festival</option>
//               <option>Corporate Event</option>
//             </select>
//             <label>Number of Guests:</label>
//             <input type="number" name="guests" onChange={handleChange} min="1" required />
//             <label>Service Location:</label>
//             <select name="location" onChange={handleChange} required>
//               <option value="">Select City</option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city}>{city}</option>
//               ))}
//             </select>
//           </>
//         )}

//         {serviceType === "family-dining" && (
//           <>
//             <label>Choose Dining Table:</label>
//             {isLoading ? (
//               <p>Loading available tables...</p>
//             ) : (
//               <select name="diningTable" onChange={handleDiningTableSelect}>
//                 <option value="">Select Table</option>
//                 {diningTables.map((table, index) => (
//                   <option key={index} value={table.name} disabled={!table.available}>
//                     {table.name}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </>
//         )}

//         <label>Payment Method:</label>
//         <select disabled>
//           <option>Cash</option>
//           <option disabled>Online Payment (Temporarily Unavailable)</option>
//         </select>

//         <button type="submit" className="confirm-btn" disabled={isSubmitting}>Confirm Booking</button>
//       </form>

//       {bookingConfirmed && (
//         <div className="success-message">
//           <span className="success-icon">✔</span>
//           <p>Booking Confirmed! Redirecting...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingPage;
