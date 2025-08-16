import React, { useState } from "react";
import axios from "axios";
import "./Payment.css"; // Import CSS file for styling
import cardImage from "../assets/images/CARD.jpeg"; // Import a sample card image
import upiImage from "../assets/images/UPI.png"; // Import a sample UPI image

const Payment = ({
  onPaymentSuccess,
  onPaymentFailure,
  onClose,
  productName, // Receive product name as prop
  productImage, // Receive product image URL as prop
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [ccv, setCcv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateCardNumber = (cardNumber) => {
    return /^\d{16}$/.test(cardNumber);
  };

  const validateCCV = (ccv) => {
    return /^\d{3}$/.test(ccv);
  };

  const validateExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  };

    
  // const handlePayment = async (e) => {
  //   e.preventDefault();
  
  //   if (paymentMethod === "card") {
  //     if (!validateCardNumber(cardNumber)) {
  //       setMessage("Invalid card number. Please enter 16 digits.");
  //       return;
  //     }
  //     if (!validateCCV(ccv)) {
  //       setMessage("Invalid CCV. Please enter 3 digits.");
  //       return;
  //     }
  //     if (!validateExpiry(expiry)) {
  //       setMessage("Invalid expiry date. Please use MM/YY format.");
  //       return;
  //     }
  //   }
  
  //   setIsLoading(true);
  //   setMessage("");
  
  //   const paymentData = {
  //     method: paymentMethod,
  //     details: paymentMethod === "card" ? { cardNumber, ccv, expiry } : { upiId },
  //     productName, // Include product name in payment data
  //     productImage, // Include product image URL in payment data
  //   };
  
  //   console.log("Sending payment data:", paymentData); // Debugging
  
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     const response = await axios.post("http://localhost:5000/api/payment", paymentData, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Ensure token is included
  //     });
  //     console.log("Payment response:", response.data); // Debugging
  //     setMessage(response.data.message);
  //     onPaymentSuccess();
  //   } catch (error) {
  //     console.error("Payment error:", error.response?.data || error.message); // Debugging
  //     setMessage("Payment Failed!");
  //     onPaymentFailure("Payment Failed!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handlePayment = async (e) => {
    e.preventDefault();
  
    if (paymentMethod === "card") {
      if (!validateCardNumber(cardNumber)) {
        setMessage("Invalid card number. Please enter 16 digits.");
        return;
      }
      if (!validateCCV(ccv)) {
        setMessage("Invalid CCV. Please enter 3 digits.");
        return;
      }
      if (!validateExpiry(expiry)) {
        setMessage("Invalid expiry date. Please use MM/YY format.");
        return;
      }
    }
  
    setIsLoading(true);
    setMessage("");
  
    const paymentData = {
      method: paymentMethod,
      details: paymentMethod === "card" ? { cardNumber, ccv, expiry } : { upiId },
      productName, // Include product name in payment data
      productImage, // Include product image URL in payment data
    };
  
    console.log("Sending payment data:", paymentData); // Debugging
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.post("http://localhost:5000/api/payment", paymentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Ensure token is included
      });
      console.log("Payment response:", response.data); // Debugging
  
      // Payment successful
      setIsPaymentSuccess(true); // Show success message
      setMessage("Payment successful!");
  
      // Close the checkout prompt after 2 seconds
      setTimeout(() => {
        onPaymentSuccess(); // Notify parent component
        onClose(); // Close the checkout prompt
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message); // Debugging
      setMessage("Payment Failed!");
      onPaymentFailure("Payment Failed!");
    } finally {
      setIsLoading(false);
    }
  };
  // return (
  //   <div className="payment-container">
  //     <button className="close-button" onClick={onClose}>
  //       ✖
  //     </button>
  //     <h2 className="title">Dummy Payment</h2>
  //     <div className="product-details">
  //       <img src={productImage} alt={productName} className="product-image" />
  //       <h3>{productName}</h3>
  //     </div>
  //     <div className="card-preview">
  //       <img src={paymentMethod === "card" ? cardImage : upiImage} alt="Payment Preview" className="card-image" />
  //     </div>
  //     <form onSubmit={handlePayment} className="payment-form">
  //       <label>Select Payment Method:</label>
  //       <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
  //         <option value="card">Credit/Debit Card</option>
  //         <option value="upi">UPI</option>
  //       </select>

  //       {paymentMethod === "card" && (
  //         <>
  //           <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} />
  //           <input type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} maxLength={3} />
  //           <input type="text" placeholder="Expiry Date (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength={5} />
  //         </>
  //       )}

  //       {paymentMethod === "upi" && (
  //         <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
  //       )}

  //       <button type="submit" className="pay-button" disabled={isLoading}>
  //         {isLoading ? "Processing..." : "Pay Now"}
  //       </button>
  //     </form>

  //     {message && <p className="message">{message}</p>}
  //   </div>
  // );

  return (
    <div className="payment-container">
      <button className="close-button" onClick={onClose}>
        ✖
      </button>
      <h2 className="title">Online Payment</h2>
      <div className="product-details">
        <img src={productImage} alt={productName} className="product-image" />
        <h3>{productName}</h3>
      </div>
      <div className="card-preview">
        <img src={paymentMethod === "card" ? cardImage : upiImage} alt="Payment Preview" className="card-image" />
      </div>
      <form onSubmit={handlePayment} className="payment-form">
        <label>Select Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
  
        {paymentMethod === "card" && (
          <>
            <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} />
            <input type="text" placeholder="CCV" value={ccv} onChange={(e) => setCcv(e.target.value)} maxLength={3} />
            <input type="text" placeholder="Expiry Date (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength={5} />
          </>
        )}
  
        {paymentMethod === "upi" && (
          <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
        )}
  
        <button type="submit" className="pay-button" disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
  
      {message && <p className="message">{message}</p>}
  
      {/* Success Message */}
      {isPaymentSuccess && (
        <div className="success-message">
          <p>Order placed successfully!</p>
        </div>
      )}
    </div>
  );

};

export default Payment;