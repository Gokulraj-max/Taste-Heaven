// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaExclamationTriangle } from "react-icons/fa";
// import { useAuth } from "../contexts/AuthContext";
// import "./ServiceOrders.css";

// // Import images for each booking type
// import imgBirthday from "../assets/images/birthday.jpg";
// import imgCatering from "../assets/images/catering.jpg";
// import imgFamilyDining from "../assets/images/dining.jpg";
// import imgWedding from "../assets/images/wedding.jpg";
// import imgDefault from "../assets/images/wedding.jpg"; // Default image

// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// const ServiceOrders = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Debugging: Log user and token
//   useEffect(() => {
//     console.log("User Object:", user);

//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   // Fetch bookings when user is available
//   useEffect(() => {
//     if (!user) return;

//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Retrieve token from localStorage
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Authentication required. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${API_URL}/api/getBookings/${user.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("📦 Frontend API Response:", response.data);

//         // Ensure the response data is an array
//         if (Array.isArray(response.data)) {
//           setBookings(response.data);
//         } else {
//           throw new Error("Invalid data format received from the server.");
//         }
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user]);

//   // Handle canceling a booking
//   const handleCancelBooking = async (booking) => {
//     if (!window.confirm(`Are you sure you want to cancel this booking?`)) {
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication required. Please log in again.');
//         return;
//       }
  
//       // Determine the API endpoint based on the service type
//       let endpoint;
//       switch (booking.serviceType.toLowerCase()) {
//         case 'birthday':
//           endpoint = `${API_URL}/api/birthday/cancel/${booking._id}`;
//           break;
//         case 'catering':
//           endpoint = `${API_URL}/api/catering/cancel/${booking._id}`;
//           break;
//         case 'family':
//           endpoint = `${API_URL}/api/family/cancel/${booking._id}`;
//           break;
//         case 'wedding':
//           endpoint = `${API_URL}/api/wedding/cancel/${booking._id}`;
//           break;
//         default:
//           throw new Error('Invalid service type.');
//       }
  
//       // Send the cancellation request
//       const response = await axios.put(
//         endpoint,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
  
//       if (response.data.message === 'Booking cancelled successfully') {
//         alert('Booking cancelled successfully!');
//         // Update the state to reflect the cancellation
//         setBookings((prevBookings) =>
//           prevBookings.map((b) =>
//             b._id === booking._id ? { ...b, status: 'Cancelled' } : b
//           )
//         );
//       } else {
//         throw new Error(response.data.message || 'Failed to cancel booking.');
//       }
//     } catch (error) {
//       console.error('Error cancelling booking:', error);
//       alert(error.response?.data?.message || 'Failed to cancel booking.');
//     }
//   };

//   // Format date for display
//   const formatDate = (date) =>
//     date
//       ? new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
//       : "Not available";

//   // Get the appropriate image for the booking type
//   const getImageForBooking = (type) => {
//     if (!type) return imgDefault; // Handle undefined service type
//     const lowerCaseType = type.toLowerCase();
//     switch (lowerCaseType) {
//       case "birthday":
//         return imgBirthday;
//       case "catering":
//         return imgCatering;
//       case "family":
//         return imgFamilyDining;
//       case "wedding":
//         return imgWedding;
//       default:
//         return imgDefault;
//     }
//   };

//   // Loading state
//   if (loading) {
//     return <div className="loading-container">Loading bookings...</div>;
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="error-container">
//         <FaExclamationTriangle className="error-icon" />
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

//   // Render bookings
//   return (
//     <div className="service-orders-container">
//       <h1>Service Bookings</h1>
//       <div className="bookings-list">
//         {bookings.length === 0 ? (
//           <p>No active bookings.</p>
//         ) : (
//           bookings.map((booking) => {
//             const serviceType =
//               booking.serviceType && typeof booking.serviceType === "string"
//                 ? booking.serviceType.toLowerCase()
//                 : "unknown";

//             console.log("Booking Object:", booking); // Debugging booking data

//             return (
//               <div className="booking-card" key={booking._id}>
//                 <img
//                   src={getImageForBooking(serviceType)}
//                   alt={booking.title}
//                   className="booking-image"
//                 />
//                 <h3>{booking.title}</h3>

//                 {/* Display status */}
//                 <p>
//                   <strong>Status:</strong> {booking.status}
//                 </p>

//                 {/* Display number of guests */}
//                 <p>
//                   <strong>Number of Guests:</strong> {booking.guests || booking.numberOfGuests}
//                 </p>

//                 {serviceType === "birthday" && (
//                   <>
//                     <p>
//                       <strong>Cake Size:</strong> {booking.cakeSize} Kg
//                     </p>
//                     <p>
//                       <strong>Cake Type:</strong> {booking.cakeType}
//                     </p>
//                   </>
//                 )}

//                 {serviceType === "catering" && (
//                   <>
//                     <p>
//                       <strong>Event Type:</strong> {booking.eventType}
//                     </p>
//                     <p>
//                       <strong>Service Location:</strong> {booking.location}
//                     </p>
//                   </>
//                 )}

//                 {serviceType === "family" && (
//                   <>
//                     <p>
//                       <strong>Dining Table:</strong> {booking.diningTable}
//                     </p>
//                     <p>
//                       <strong>Event Date:</strong> {formatDate(booking.eventDateTime)}
//                     </p>
//                   </>
//                 )}

//                 {serviceType === "wedding" && (
//                   <>
//                     <p>
//                       <strong>Event Type:</strong> {booking.eventType}
//                     </p>
//                     <p>
//                       <strong>Service Location:</strong> {booking.location}
//                     </p>
//                     <p>
//                       <strong>Catering Service:</strong> {booking.cateringService}
//                     </p>
//                     <p>
//                       <strong>Decoration Service:</strong> {booking.decorationService}
//                     </p>
//                   </>
//                 )}

//                 <p>
//                   <strong>Event Date:</strong> {formatDate(booking.eventDate || booking.eventDateTime)}
//                 </p>
//                 <p>
//                   <strong>Payment Method:</strong> {booking.paymentMethod}
//                 </p>

//                 <button className="cancel-button" onClick={() => handleCancelBooking(booking)}>
//                   Cancel Booking
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default ServiceOrders;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import "./ServiceOrders.css";

// Import images for each booking type
import imgBirthday from "../assets/images/birthday.jpg";
import imgCatering from "../assets/images/catering.jpg";
import imgFamilyDining from "../assets/images/dining.jpg";
import imgWedding from "../assets/images/wedding.jpg";
import imgDefault from "../assets/images/wedding.jpg"; // Default image

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const ServiceOrders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Debugging: Log user and token
  useEffect(() => {
    console.log("User Object:", user);

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch bookings when user is available
  useEffect(() => {
    if (!user) return;

    // const fetchBookings = async () => {
    //   try {
    //     setLoading(true);
    //     setError(null);

    //     // Retrieve token from localStorage
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //       setError("Authentication required. Please log in again.");
    //       setLoading(false);
    //       return;
    //     }

    //     // Fetch bookings for each service type
    //     const birthdayResponse = await axios.get(`${API_URL}/api/birthday/getBookings/${user.id}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const cateringResponse = await axios.get(`${API_URL}/api/catering/getBookings/${user.id}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const familyResponse = await axios.get(`${API_URL}/api/family/getBookings/${user.id}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const weddingResponse = await axios.get(`${API_URL}/api/wedding/getBookings/${user.id}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });

    //     // Combine all bookings into a single array
    //     const allBookings = [
    //       ...birthdayResponse.data.map((b) => ({ ...b, serviceType: "birthday" })),
    //       ...cateringResponse.data.map((b) => ({ ...b, serviceType: "catering" })),
    //       ...familyResponse.data.map((b) => ({ ...b, serviceType: "family" })),
    //       ...weddingResponse.data.map((b) => ({ ...b, serviceType: "wedding" })),
    //     ];

    //     setBookings(allBookings);
    //   } catch (error) {
    //     console.error("Error fetching bookings:", error);
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
    
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required. Please log in again.");
          setLoading(false);
          return;
        }
    
        // Fetch bookings for each service type
        const birthdayResponse = await axios.get(`${API_URL}/api/birthday/getBookings/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cateringResponse = await axios.get(`${API_URL}/api/catering/getBookings/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const familyResponse = await axios.get(`${API_URL}/api/family/getBookings/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const weddingResponse = await axios.get(`${API_URL}/api/wedding/getBookings/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        // Combine all bookings into a single array
        const allBookings = [
          ...birthdayResponse.data.map((b) => ({ ...b, serviceType: "birthday" })),
          ...cateringResponse.data.map((b) => ({ ...b, serviceType: "catering" })),
          ...familyResponse.data.map((b) => ({ ...b, serviceType: "family" })),
          ...weddingResponse.data.map((b) => ({ ...b, serviceType: "wedding" })),
        ];
    
        setBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  // Handle canceling a booking (unchanged)
  const handleCancelBooking = async (booking) => {
    if (!window.confirm(`Are you sure you want to cancel this booking?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in again.");
        return;
      }

      // Determine the API endpoint based on the service type
      let endpoint;
      switch (booking.serviceType.toLowerCase()) {
        case "birthday":
          endpoint = `${API_URL}/api/birthday/cancel/${booking._id}`;
          break;
        case "catering":
          endpoint = `${API_URL}/api/catering/cancel/${booking._id}`;
          break;
        case "family":
          endpoint = `${API_URL}/api/family/cancel/${booking._id}`;
          break;
        case "wedding":
          endpoint = `${API_URL}/api/wedding/cancel/${booking._id}`;
          break;
        default:
          throw new Error("Invalid service type.");
      }

      // Send the cancellation request
      const response = await axios.put(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Booking cancelled successfully") {
        alert("Booking cancelled successfully!");
        // Update the state to reflect the cancellation
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === booking._id ? { ...b, status: "Cancelled" } : b
          )
        );
      } else {
        throw new Error(response.data.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert(error.response?.data?.message || "Failed to cancel booking.");
    }
  };

  // Format date for display
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "Not available";

  // Get the appropriate image for the booking type
  const getImageForBooking = (type) => {
    if (!type) return imgDefault; // Handle undefined service type
    const lowerCaseType = type.toLowerCase();
    switch (lowerCaseType) {
      case "birthday":
        return imgBirthday;
      case "catering":
        return imgCatering;
      case "family":
        return imgFamilyDining;
      case "wedding":
        return imgWedding;
      default:
        return imgDefault;
    }
  };

  // Loading state
  if (loading) {
    return <div className="loading-container">Loading bookings...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <FaExclamationTriangle className="error-icon" />
        <p>Error: {error}</p>
      </div>
    );
  }

  // Render bookings
  return (
    <div className="service-orders-container">
      <h1>Service Bookings</h1>
      <div className="bookings-list">
        {bookings.length === 0 ? (
          <p>No active bookings.</p>
        ) : (
          bookings.map((booking) => {
            const serviceType =
              booking.serviceType && typeof booking.serviceType === "string"
                ? booking.serviceType.toLowerCase()
                : "unknown";

            return (
              <div className="booking-card" key={booking._id}>
                <img
                  src={getImageForBooking(serviceType)}
                  alt={booking.title}
                  className="booking-image"
                />
                <div className="booking-details">
                  <h3>{serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Booking</h3>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.guests || booking.numberOfGuests}
                  </p>
                  <p>
                    <strong>Event Date:</strong> {formatDate(booking.eventDate || booking.eventDateTime)}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {booking.paymentMethod}
                  </p>
                  {serviceType === "birthday" && (
                    <p>
                      <strong>Cake:</strong> {booking.cakeType} ({booking.cakeSize} Kg)
                    </p>
                  )}
                  {serviceType === "catering" && (
                    <p>
                      <strong>Event Type:</strong> {booking.eventType}
                    </p>
                  )}
                  {serviceType === "wedding" && (
                    <p>
                      <strong>Event Type:</strong> {booking.eventType}
                    </p>
                  )}
                  <button
                    className="cancel-button"
                    onClick={() => handleCancelBooking(booking)}
                    disabled={booking.status === "Cancelled"}
                  >
                    {booking.status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ServiceOrders;