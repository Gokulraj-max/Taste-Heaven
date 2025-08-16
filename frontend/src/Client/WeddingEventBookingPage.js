// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../contexts/AuthContext";
// import { motion } from "framer-motion";
// import './booking.css';

// const WeddingEventBookingPage = () => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({});
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
//     { name: "eventType", label: "Event Type", type: "select", options: ["Traditional", "Destination", "Modern"] },
//     { name: "guests", label: "Number of Guests", type: "number" },
//     { name: "location", label: "Service Location", type: "select", options: ["Chennai", "Coimbatore", "Madurai", "Trichy"] },
//     { name: "cateringService", label: "Catering Service", type: "select", options: ["Yes", "No"] },
//     { name: "decorationService", label: "Decoration Service", type: "select", options: ["Yes", "No"] },
//     { name: "eventDate", label: "Event Date", type: "date" },
//     { name: "eventTime", label: "Event Time", type: "select", options: ["Morning", "Afternoon", "Evening", "Night"] },
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
      
//       const response = await fetch('/api/wedding/book', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ 
//           serviceType: "wedding", 
//           formData, 
//           paymentMethod 
//         }),
//       });
      
//       const data = await response.json();
  
//       if (response.ok) {
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
//       <h1>Wedding Event Booking</h1>
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
//             <select name={fields[step].name} onChange={handleChange} required>
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

// export default WeddingEventBookingPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import './booking.css';

const WeddingEventBookingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
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
    { name: "eventType", label: "Event Type", type: "select", options: ["Traditional", "Destination", "Modern"] },
    { name: "guests", label: "Number of Guests", type: "number" },
    { name: "location", label: "Service Location", type: "select", options: ["Chennai", "Coimbatore", "Madurai", "Trichy"] },
    { name: "cateringService", label: "Catering Service", type: "select", options: ["Yes", "No"] },
    { name: "decorationService", label: "Decoration Service", type: "select", options: ["Yes", "No"] },
    { name: "eventDate", label: "Event Date", type: "date" },
    { name: "eventTime", label: "Event Time", type: "select", options: ["Morning", "Afternoon", "Evening", "Night"] },
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
      
      const response = await fetch('/api/wedding/book', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          serviceType: "wedding", 
          formData, 
          paymentMethod 
        }),
      });
      
      const data = await response.json();
  
      if (response.ok) {
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
        <h1>Wedding Event Booking</h1>
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
              <select name={fields[step].name} onChange={handleChange} required>
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

export default WeddingEventBookingPage;