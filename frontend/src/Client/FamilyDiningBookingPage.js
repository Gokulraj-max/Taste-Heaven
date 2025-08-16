// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../contexts/AuthContext";
// import { motion } from "framer-motion";
// import './booking.css';

// const FamilyDiningBookingPage = () => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     diningTable: '',
//     eventDate: '',
//     eventTime: '',
//     numberOfGuests: ''
//   });
//   const [paymentMethod, setPaymentMethod] = useState("Cash");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [step, setStep] = useState(0);
//   const [showDialog, setShowDialog] = useState(false);

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login");
//     }
//   }, [loading, user, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const fields = [
//     { name: "diningTable", label: "Choose Dining Table", type: "select", options: [
//       "Royal Table (4 Seats)", "Elite Table (6 Seats)", "Luxury Table (8 Seats)", "Grand Table (10 Seats)", "Supreme Table (12 Seats)"
//     ]},
//     { name: "eventDate", label: "Event Date", type: "date" },
//     { name: "eventTime", label: "Event Time", type: "select", options: ["Morning", "Afternoon", "Evening", "Night"] },
//     { name: "numberOfGuests", label: "Number of Guests", type: "number" },
//     { name: "paymentMethod", label: "Payment Method", type: "select", options: ["Cash", "Online (Currently Unavailable)"] }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowDialog(true);
//   };


//   const confirmBooking = async () => {
//     setIsSubmitting(true);
//     setShowDialog(false);
  
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("No token found. Please login again.");
//         navigate("/login");
//         return;
//       }
  
//       // Map eventTime to HH:MM format
//       const timeMapping = {
//         Morning: "10:00",
//         Afternoon: "14:00",
//         Evening: "18:00",
//         Night: "22:00",
//       };
  
//       const eventTime = timeMapping[formData.eventTime] || "00:00"; // Default to "00:00" if not found
  
//       // Combine eventDate and eventTime into a single eventDateTime field
//       const eventDateTime = new Date(`${formData.eventDate}T${eventTime}:00`);
  
//       // Validate the eventDateTime
//       if (isNaN(eventDateTime.getTime())) {
//         alert("Invalid date or time. Please check your input.");
//         return;
//       }
  
//       // Prepare the request body
//       const requestBody = {
//         diningTable: formData.diningTable,
//         eventDateTime: eventDateTime.toISOString(), // Convert to ISO string for backend
//         numberOfGuests: parseInt(formData.numberOfGuests, 10), // Ensure it's a number
//         paymentMethod,
//       };
  
//       console.log("Request Body:", requestBody); // Debugging: Log the request body
  
//       const response = await fetch('/api/family/book', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert("Booking created successfully!");
//         navigate("/service-orders");
//       } else {
//         alert(data.message || 'Error booking the service');
//       }
//     } catch (error) {
//       console.error("Error booking the service:", error);
//       alert('Error booking the service');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   return (
//     <div className="booking-container">
//       <h1>Family Dining Booking</h1>
//       <form onSubmit={handleSubmit}>
//         <motion.div 
//           key={fields[step].name} 
//           initial={{ opacity: 0, x: 100 }} 
//           animate={{ opacity: 1, x: 0 }} 
//           exit={{ opacity: 0, x: -100 }} 
//           transition={{ duration: 0.5 }}
//         >
//           <label>{fields[step].label}:</label>
//           {fields[step].type === "select" ? (
//             <select 
//               name={fields[step].name} 
//               onChange={handleChange} 
//               value={formData[fields[step].name]} 
//               required
//             >
//               <option value="">Select {fields[step].label}</option>
//               {fields[step].options.map((option) => (
//                 <option key={option} value={option} disabled={option.includes("Unavailable")}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <input 
//               type={fields[step].type} 
//               name={fields[step].name} 
//               value={formData[fields[step].name]} 
//               onChange={handleChange} 
//               required 
//             />
//           )}
//         </motion.div>

//         <div className="button-group">
//           {step > 0 && (
//             <button type="button" onClick={() => setStep(step - 1)}>Previous</button>
//           )}
//           {step < fields.length - 1 ? (
//             <button type="button" onClick={() => setStep(step + 1)}>Next</button>
//           ) : (
//             <button type="submit" disabled={isSubmitting}>Confirm Booking</button>
//           )}
//         </div>
//       </form>

//       {showDialog && (
//         <div className="dialog-box">
//           <p>Pre-booking charge: ₹150</p>
//           <button onClick={confirmBooking}>OK</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FamilyDiningBookingPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import './booking.css';

const FamilyDiningBookingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    diningTable: '',
    eventDate: '',
    eventTime: '',
    numberOfGuests: ''
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    { name: "diningTable", label: "Choose Dining Table", type: "select", options: [
      "Royal Table (4 Seats)", "Elite Table (6 Seats)", "Luxury Table (8 Seats)", "Grand Table (10 Seats)", "Supreme Table (12 Seats)"
    ]},
    { name: "eventDate", label: "Event Date", type: "date" },
    { name: "eventTime", label: "Event Time", type: "select", options: ["Morning", "Afternoon", "Evening", "Night"] },
    { name: "numberOfGuests", label: "Number of Guests", type: "number" },
    { name: "paymentMethod", label: "Payment Method", type: "select", options: ["Cash", "Online (Currently Unavailable)"] }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const confirmBooking = async () => {
    setIsSubmitting(true);
    setShowDialog(false);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        navigate("/login");
        return;
      }
  
      const timeMapping = {
        Morning: "10:00",
        Afternoon: "14:00",
        Evening: "18:00",
        Night: "22:00",
      };
  
      const eventTime = timeMapping[formData.eventTime] || "00:00";
      const eventDateTime = new Date(`${formData.eventDate}T${eventTime}:00`);
  
      if (isNaN(eventDateTime.getTime())) {
        alert("Invalid date or time. Please check your input.");
        return;
      }
  
      const requestBody = {
        diningTable: formData.diningTable,
        eventDateTime: eventDateTime.toISOString(),
        numberOfGuests: parseInt(formData.numberOfGuests, 10),
        paymentMethod,
      };
  
      const response = await fetch('/api/family/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Booking created successfully!");
        navigate("/service-orders");
      } else {
        alert(data.message || 'Error booking the service');
      }
    } catch (error) {
      console.error("Error booking the service:", error);
      alert('Error booking the service');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="book-service">
      <div className="booking-container">
        <h1>Family Dining Booking</h1>
        <form onSubmit={handleSubmit}>
          <motion.div 
            key={fields[step].name} 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -100 }} 
            transition={{ duration: 0.5 }}
          >
            <label>{fields[step].label}:</label>
            {fields[step].type === "select" ? (
              <select 
                name={fields[step].name} 
                onChange={handleChange} 
                value={formData[fields[step].name]} 
                required
              >
                <option value="">Select {fields[step].label}</option>
                {fields[step].options.map((option) => (
                  <option key={option} value={option} disabled={option.includes("Unavailable")}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input 
                type={fields[step].type} 
                name={fields[step].name} 
                value={formData[fields[step].name]} 
                onChange={handleChange} 
                required 
              />
            )}
          </motion.div>

          <div className="button-group">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)}>Previous</button>
            )}
            {step < fields.length - 1 ? (
              <button type="button" onClick={() => setStep(step + 1)}>Next</button>
            ) : (
              <button type="submit" disabled={isSubmitting}>Confirm Booking</button>
            )}
          </div>
        </form>

        {showDialog && (
          <div className="dialog-box">
            <p>Pre-booking charge: ₹150</p>
            <button onClick={confirmBooking}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyDiningBookingPage;