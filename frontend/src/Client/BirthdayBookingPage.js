// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../contexts/AuthContext";
// import { motion } from "framer-motion";
// import './booking.css';

// const BirthdayBookingPage = () => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   const fields = [
//     { name: "guests", label: "Number of Guests", type: "number", min: "1" },
//     { name: "cakeSize", label: "Cake Size (Kg)", type: "number", min: "0" },
//     { name: "cakeType", label: "Cake Type", type: "select", options: ["Chocolate", "Vanilla", "Strawberry"] },
//     { name: "eventDate", label: "Event Date", type: "date" },
//     { name: "eventTime", label: "Event Time", type: "select", options: ["Morning", "Afternoon", "Evening", "Night"] },
//     { name: "paymentMethod", label: "Payment Method", type: "select", options: ["Cash" ,"Online(Currently Unavailable)"] }
//   ];

//   const [formData, setFormData] = useState({});
//   const [step, setStep] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login");
//     }
//   }, [loading, user, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     if (step < fields.length - 1) setStep(step + 1);
//   };

//   const handlePrev = () => {
//     if (step > 0) setStep(step - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("No token found. Please login again.");
//         navigate("/login");
//         return;
//       }
      
//       const eventDateTime = new Date(formData.eventDate);
//       switch (formData.eventTime) {
//         case 'Morning': eventDateTime.setHours(9, 0, 0, 0); break;
//         case 'Afternoon': eventDateTime.setHours(13, 0, 0, 0); break;
//         case 'Evening': eventDateTime.setHours(18, 0, 0, 0); break;
//         case 'Night': eventDateTime.setHours(21, 0, 0, 0); break;
//         default: eventDateTime.setHours(9, 0, 0, 0);
//       }
      
//       await fetch('/api/birthday/book', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...formData,
//           eventDate: eventDateTime.toISOString(),
//         }),
//       });
      
//       setShowDialog(true);
//     } catch (error) {
//       console.error("Error booking the service:", error);
//       alert('Error booking the service');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h1>Birthday Booking</h1>
//       <motion.div
//         key={step}
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -100 }}
//         transition={{ duration: 0.5 }}
//         className="form-step"
//       >
//         <label>{fields[step].label}:</label>
//         {fields[step].type === "select" ? (

// <select name={fields[step].name} onChange={handleChange} required>
//   <option value="">Select an option</option>
//   {fields[step].options.map((option) => (
//     <option key={option} value={option} disabled={option === "Online(Currently Unavailable)"}>
//       {option}
//     </option>
//   ))}
// </select>
//         ) : (
//           <input 
//             type={fields[step].type} 
//             name={fields[step].name} 
//             onChange={handleChange} 
//             min={fields[step].min || ""} 
//             required 
//           />
//         )}
//       </motion.div>
//       <div className="form-navigation">
//         {step > 0 && <button onClick={handlePrev}>Previous</button>}
//         {step < fields.length - 1 ? (
//           <button onClick={handleNext}>Next</button>
//         ) : (
//           <button onClick={handleSubmit} disabled={isSubmitting}>Confirm Booking</button>
//         )}
//       </div>
//       {showDialog && (
//         <div className="dialog-box">
//           <p>Pre-booking charge ₹150</p>
//           <button onClick={() => navigate("/service-orders")}>OK</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BirthdayBookingPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import './booking.css';

const BirthdayBookingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const fields = [
    { name: "guests", label: "Number of Guests", type: "number", min: "1" },
    { name: "cakeSize", label: "Cake Size (Kg)", type: "number", min: "0" },
    { name: "cakeType", label: "Cake Type", type: "select", options: ["Chocolate", "Vanilla", "Strawberry"] },
    { name: "eventDate", label: "Event Date", type: "date" },
    { name: "eventTime", label: "Event Time", type: "select", options: ["Morning", "Afternoon", "Evening", "Night"] },
    { name: "paymentMethod", label: "Payment Method", type: "select", options: ["Cash", "Online (Currently Unavailable)"] }
  ];

  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < fields.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        navigate("/login");
        return;
      }
      
      const eventDateTime = new Date(formData.eventDate);
      switch (formData.eventTime) {
        case 'Morning': eventDateTime.setHours(9, 0, 0, 0); break;
        case 'Afternoon': eventDateTime.setHours(13, 0, 0, 0); break;
        case 'Evening': eventDateTime.setHours(18, 0, 0, 0); break;
        case 'Night': eventDateTime.setHours(21, 0, 0, 0); break;
        default: eventDateTime.setHours(9, 0, 0, 0);
      }
      
      await fetch('/api/birthday/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          eventDate: eventDateTime.toISOString(),
        }),
      });
      
      setShowDialog(true);
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
        <h1>Birthday Booking</h1>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="form-step"
        >
          <label>{fields[step].label}:</label>
          {fields[step].type === "select" ? (
            <select name={fields[step].name} onChange={handleChange} required>
              <option value="">Select an option</option>
              {fields[step].options.map((option) => (
                <option key={option} value={option} disabled={option === "Online (Currently Unavailable)"}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input 
              type={fields[step].type} 
              name={fields[step].name} 
              onChange={handleChange} 
              min={fields[step].min || ""} 
              required 
            />
          )}
        </motion.div>
        <div className="form-navigation">
          {step > 0 && <button onClick={handlePrev}>Previous</button>}
          {step < fields.length - 1 ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting}>Confirm Booking</button>
          )}
        </div>
        {showDialog && (
          <div className="dialog-box">
            <p>Pre-booking charge ₹150</p>
            <button onClick={() => navigate("/service-orders")}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayBookingPage;