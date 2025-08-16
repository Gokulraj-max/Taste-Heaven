// import React, { useEffect } from "react";
// import { useForm, ValidationError } from "@formspree/react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ContactForm.css"; // Import the CSS file

// function ContactForm1() {
//   const [state, handleSubmit] = useForm("xvgzqzge");

//   // Show success message when form is successfully submitted
//   useEffect(() => {
//     if (state.succeeded) {
//       toast.success("Message sent successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     }
//   }, [state.succeeded]);

//   return (
//     <div className="contact-form-container">
//       <h2>Contact Us</h2>
//       <form onSubmit={handleSubmit} className="contact-form">
//         <div className="form-group">
//           <label htmlFor="firstName">First Name</label>
//           <input id="firstName" type="text" name="firstName" required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="lastName">Last Name</label>
//           <input id="lastName" type="text" name="lastName" required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email Address</label>
//           <input id="email" type="email" name="email" required />
//           <ValidationError prefix="Email" field="email" errors={state.errors} />
//         </div>

//         <div className="form-group">
//           <label htmlFor="message">Message</label>
//           <textarea id="message" name="message" required />
//           <ValidationError prefix="Message" field="message" errors={state.errors} />
//         </div>

//         <button type="submit" disabled={state.submitting} className="submit-btn">
//           Submit
//         </button>
//       </form>

//       {/* Toast Notification */}
//       <ToastContainer />
//     </div>
//   );
// }

// export default ContactForm1;


import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext"; // Adjust path as needed
import "react-toastify/dist/ReactToastify.css";
import "./ContactForm.css";

function ContactForm1() {
  const [state, handleSubmit] = useForm("xvgzqzge");
  const { user } = useAuth();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  // Prefill fields if user is available
  useEffect(() => {
    if (user) {
      setFormValues((prev) => ({
        ...prev,
        firstName: user.name ? user.name.split(" ")[0] : "",
        lastName: user.name ? user.name.split(" ").slice(1).join(" ") : "",
        email: user.email || ""
      }));
    }
  }, [user]);

  // Show success message when form is successfully submitted
  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            type="text" 
            name="firstName" 
            value={formValues.firstName}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            type="text" 
            name="lastName" 
            value={formValues.lastName}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={formValues.email}
            onChange={handleChange}
            required 
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            value={formValues.message}
            onChange={handleChange}
            required 
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <button type="submit" disabled={state.submitting} className="submit-btn">
          Submit
        </button>
      </form>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}

export default ContactForm1;
