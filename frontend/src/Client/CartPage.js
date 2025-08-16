// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useCart } from "../contexts/CartContext";
// import Payment from "./Payment"; // Import the Payment component
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./CartPage.css";

// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// const CartPage = () => {
//   const { cart, updateQuantity, removeFromCart } = useCart();
//   const [checkoutItem, setCheckoutItem] = useState(null);
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
//   const [transactionId, setTransactionId] = useState(null);
//   const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Track payment status
//   const [showFullScreenPayment, setShowFullScreenPayment] = useState(false); // Full-screen payment state
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const checkoutRef = useRef(null);

//   // Fetch user address when the component mounts or when the user changes
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       fetchUserAddress();
//     }
//   }, [user, navigate]);

//   // Function to fetch the user's address from the backend
//   const fetchUserAddress = async () => {
//     if (!user || !user.id) {
//       console.error("User ID not found");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/api/users/address/${user.id}`);
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }
//       const data = await response.json();
//       console.log("Address fetched:", data);

//       if (data.address) {
//         setAddress(data.address);
//       } else {
//         console.error("Address not found in response");
//         alert("Address not found. Please enter your address manually.");
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       alert("Failed to fetch address. Please enter your address manually.");
//     }
//   };

//   // Function to update the user's address in the backend
//   const updateAddress = async () => {
//     if (!user || !user.id) {
//       console.error("User ID not found");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/api/users/address/${user.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ address }), // Send the updated address
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log("Address updated:", data);
//       alert("Address updated successfully!");
//     } catch (error) {
//       console.error("Error updating address:", error);
//       alert("Failed to update address. Please try again.");
//     }
//   };

//   // Function to handle quantity changes for items in the cart
//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity > 0) {
//       updateQuantity(itemId, newQuantity); // Update the quantity in the cart
//     } else {
//       alert("Quantity cannot be less than 1.");
//     }
//   };

//   // Handle placing an order
//   // const handleOrder = async () => {
//   //   if (!user) {
//   //     alert("User not logged in");
//   //     return;
//   //   }

//   //   const orderDetails = {
//   //     userId: user.id,
//   //     name: checkoutItem.name,
//   //     estimatedTime: "30-40 mins",
//   //     location: address,
//   //     image: checkoutItem.image || "",
//   //     cancelCharge: 10,
//   //     items: [
//   //       {
//   //         name: checkoutItem.name,
//   //         quantity: checkoutItem.quantity,
//   //         price: checkoutItem.price,
//   //       },
//   //     ],
//   //     totalAmount: checkoutItem.price * checkoutItem.quantity,
//   //     paymentMethod,
//   //     status: "Pending",
//   //     transactionId: paymentMethod === "Online Payment" ? `TXN${Date.now()}` : null,
//   //   };

//   //   const placeOrder = async () => {
//   //     try {
//   //       const response = await fetch(`${API_URL}/api/orders`, {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(orderDetails),
//   //       });

//   //       if (!response.ok) {
//   //         throw new Error("Order placement failed");
//   //       }

//   //       alert("Order placed successfully!");
//   //       removeFromCart(checkoutItem._id);
//   //       setCheckoutItem(null);
//   //     } catch (error) {
//   //       console.error("Error placing order:", error);
//   //       alert("Error placing order. Please try again.");
//   //     }
//   //   };

//   //   if (paymentMethod === "Online Payment") {
//   //     // Show the Payment component and wait for payment success
//   //     setIsPaymentSuccessful(false); // Reset payment status
//   //     setTransactionId(orderDetails.transactionId);
//   //   } else {
//   //     // For Cash on Delivery, place the order directly
//   //     await placeOrder();
//   //   }
//   // };
//   const handleOrder = async () => {
//     if (!user) {
//       alert("User not logged in");
//       return;
//     }
  
//     const orderDetails = {
//       userId: user.id,
//       name: checkoutItem.name,
//       estimatedTime: "30-40 mins",
//       location: address,
//       image: checkoutItem.image || "",
//       cancelCharge: 10,
//       items: [
//         {
//           name: checkoutItem.name,
//           quantity: checkoutItem.quantity,
//           price: checkoutItem.price,
//         },
//       ],
//       totalAmount: checkoutItem.price * checkoutItem.quantity,
//       paymentMethod,
//       status: "Pending",
//       transactionId: paymentMethod === "Online Payment" ? `TXN${Date.now()}` : null,
//     };
  
//     const placeOrder = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/orders`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(orderDetails),
//         });
  
//         if (!response.ok) {
//           throw new Error("Order placement failed");
//         }
  
//         alert("Order placed successfully!");
//         removeFromCart(checkoutItem._id); // Remove product from cart
//         setCheckoutItem(null); // Close checkout prompt
//       } catch (error) {
//         console.error("Error placing order:", error);
//         alert("Error placing order. Please try again.");
//       }
//     };
  
//     if (paymentMethod === "Online Payment") {
//       // Show the Payment component and wait for payment success
//       setIsPaymentSuccessful(false); // Reset payment status
//       setTransactionId(orderDetails.transactionId);
//     } else {
//       // For Cash on Delivery, place the order directly
//       await placeOrder();
//     }
//   };

//   // Debug the showFullScreenPayment state
//   useEffect(() => {
//     console.log("showFullScreenPayment:", showFullScreenPayment);
//   }, [showFullScreenPayment]);

//   return (
//     <div className="container-th mt-4">
//       <h1 className="header-th">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p className="empty-cart-th">Your cart is empty.</p>
//       ) : (
//         <div className="cart-row-th">
//           {cart.map((item) => (
//             <div key={item._id} className="cart-item-th">
//               <img src={item.image} alt={item.name} className="product-image-th" />
//               <h3>{item.name}</h3>
//               <p>Price: ₹{item.price}</p>
//               <div className="quantity-controls-th">
//                 <button
//                   className="quantity-button-th"
//                   onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   className="quantity-button-th"
//                   onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                 >
//                   +
//                 </button>
//               </div>
//               <button className="buy-now-th" onClick={() => setCheckoutItem(item)}>
//                 Buy Now
//               </button>
//               <button
//                 className="cancel-button-th"
//                 onClick={() => removeFromCart(item._id)}
//               >
//                 Cancel
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {checkoutItem && (
//         <div className="checkout-th" ref={checkoutRef}>
//           <button className="close-button-th" onClick={() => setCheckoutItem(null)}>
//             ✖
//           </button>
//           <h2>Checkout</h2>
//           <div className="form-group-th">
//             <label className="form-label-th">Address:</label>
//             <input
//               type="text"
//               className="form-input-th"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your address"
//             />
//             <button className="save-address-th" onClick={updateAddress}>
//               Save Address
//             </button>
//           </div>
//           <div className="form-group-th">
//             <label className="form-label-th">Product:</label>
//             <p>{checkoutItem.name}</p>
//           </div>
//           <div className="form-group-th">
//             <label className="form-label-th">Quantity:</label>
//             <p>{checkoutItem.quantity}</p>
//           </div>
//           <div className="form-group-th">
//             <label className="form-label-th">Total Price:</label>
//             <p>₹{checkoutItem.price * checkoutItem.quantity}</p>
//           </div>
//           <div className="form-group-th">
//             <label className="form-label-th">Payment Method:</label>
//             <select
//               className="form-select-th"
//               value={paymentMethod}
//               onChange={(e) => {
//                 setPaymentMethod(e.target.value);
//                 if (e.target.value === "Online Payment") {
//                   setShowFullScreenPayment(true); // Show full-screen payment
//                 } else {
//                   setShowFullScreenPayment(false); // Hide full-screen payment
//                 }
//               }}
//             >
//               <option value="Cash on Delivery">Cash on Delivery</option>
//               <option value="Online Payment">Online Payment</option>
//             </select>
//           </div>

//           {/* Show Place Order button for Cash on Delivery */}
//           {paymentMethod === "Cash on Delivery" && (
//             <button className="place-order-th" onClick={handleOrder}>
//               Place Order
//             </button>
//           )}
//         </div>
//       )}

//       {/* Full-screen Payment Prompt */}
//       {showFullScreenPayment && (
//         <div className="fullscreen-payment-th">
//           <div className="fullscreen-payment-content-th">
//             <Payment
//               productName={checkoutItem.name} // Pass product name
//               productImage={checkoutItem.image} // Pass product image URL
//               onPaymentSuccess={() => {
//                 setIsPaymentSuccessful(true);
//                 setShowFullScreenPayment(false); // Close full-screen payment
//                 handleOrder(); // Place the order after payment success
//               }}
//               onPaymentFailure={(message) => {
//                 alert(message); // Show payment failure message
//                 setShowFullScreenPayment(false); // Close full-screen payment
//               }}
//               onClose={() => setShowFullScreenPayment(false)} // Close full-screen payment
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import Payment from "./Payment"; // Import the Payment component
import "bootstrap/dist/css/bootstrap.min.css";
import "./CartPage.css";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [transactionId, setTransactionId] = useState(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Track payment status
  const [showFullScreenPayment, setShowFullScreenPayment] = useState(false); // Full-screen payment state
  const navigate = useNavigate();
  const { user } = useAuth();
  const checkoutRef = useRef(null);

  // Fetch user address when the component mounts or when the user changes
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchUserAddress();
    }
  }, [user, navigate]);

  // Function to fetch the user's address from the backend
  const fetchUserAddress = async () => {
    if (!user || !user.id) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/address/${user.id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Address fetched:", data);

      if (data.address) {
        setAddress(data.address);
      } else {
        console.error("Address not found in response");
        alert("Address not found. Please enter your address manually.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Failed to fetch address. Please enter your address manually.");
    }
  };

  // Function to update the user's address in the backend
  const updateAddress = async () => {
    if (!user || !user.id) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/address/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }), // Send the updated address
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Address updated:", data);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  // Function to handle quantity changes for items in the cart
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity); // Update the quantity in the cart
    } else {
      alert("Quantity cannot be less than 1.");
    }
  };

  // Handle placing an order
  // const handleOrder = async () => {
  //   if (!user) {
  //     alert("User not logged in");
  //     return;
  //   }

  //   const orderDetails = {
  //     userId: user.id,
  //     name: checkoutItem.name,
  //     estimatedTime: "30-40 mins",
  //     location: address,
  //     image: checkoutItem.image || "",
  //     cancelCharge: 10,
  //     items: [
  //       {
  //         name: checkoutItem.name,
  //         quantity: checkoutItem.quantity,
  //         price: checkoutItem.price,
  //       },
  //     ],
  //     totalAmount: checkoutItem.price * checkoutItem.quantity,
  //     paymentMethod,
  //     status: "Pending",
  //     transactionId: paymentMethod === "Online Payment" ? `TXN${Date.now()}` : null,
  //   };

  //   const placeOrder = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/api/orders`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(orderDetails),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Order placement failed");
  //       }

  //       alert("Order placed successfully!");
  //       removeFromCart(checkoutItem._id); // Remove product from cart
  //       setCheckoutItem(null); // Reset checkout item
  //     } catch (error) {
  //       console.error("Error placing order:", error);
  //       alert("Error placing order. Please try again.");
  //     }
  //   };

  //   if (paymentMethod === "Online Payment") {
  //     // Show the Payment component and wait for payment success
  //     setIsPaymentSuccessful(false); // Reset payment status
  //     setTransactionId(orderDetails.transactionId);
  //   } else {
  //     // For Cash on Delivery, place the order directly
  //     await placeOrder();
  //   }
  // };
  const handleOrder = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }
  
    const orderDetails = {
      user: user.id, // Map userId to the 'user' field
      name: checkoutItem.name,
      estimatedTime: "30-40 mins",
      location: address,
      image: checkoutItem.image || "",
      cancelCharge: 10,
      items: [
        {
          name: checkoutItem.name,
          quantity: checkoutItem.quantity,
          price: checkoutItem.price,
        },
      ],
      totalAmount: checkoutItem.price * checkoutItem.quantity,
      paymentMethod,
      status: "Pending",
      transactionId: paymentMethod === "Online Payment" ? `TXN${Date.now()}` : null,
    };
  
    const placeOrder = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        });
  
        if (!response.ok) {
          throw new Error("Order placement failed");
        }
  
        alert("Order placed successfully!");
        removeFromCart(checkoutItem._id); // Remove product from cart
        setCheckoutItem(null); // Reset checkout item
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again.");
      }
    };
  
    if (paymentMethod === "Online Payment") {
      // Show the Payment component and wait for payment success
      setIsPaymentSuccessful(false); // Reset payment status
      setTransactionId(orderDetails.transactionId);
    } else {
      // For Cash on Delivery, place the order directly
      await placeOrder();
    }
  };
  return (
    <div className="container-th mt-4">
      <h1 className="header-th">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-th">Your cart is empty.</p>
      ) : (
        <div className="cart-row-th">
          {cart.map((item) => (
            <div key={item._id} className="cart-item-th">
              <img src={item.image} alt={item.name} className="product-image-th" />
              <p className="item-name">{item.name}</p>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-controls-th">
                <button
                  className="quantity-button-th"
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-button-th"
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="buy-now-th" onClick={() => setCheckoutItem(item)}>
                Buy Now
              </button>
              <button
                className="cancel-button-th"
                onClick={() => removeFromCart(item._id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}

      {checkoutItem && (
        <div className="checkout-th" ref={checkoutRef}>
          <button className="close-button-th" onClick={() => setCheckoutItem(null)}>
            ✖
          </button>
          <h2>Checkout</h2>
          <div className="form-group-th">
            <label className="form-label-th">Address:</label>
            <input
              type="text"
              className="form-input-th"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
            <button className="save-address-th" onClick={updateAddress}>
              Save Address
            </button>
          </div>
          <div className="form-group-th">
            <label className="form-label-th">Product:</label>
            <p>{checkoutItem.name}</p>
          </div>
          <div className="form-group-th">
            <label className="form-label-th">Quantity:</label>
            <p>{checkoutItem.quantity}</p>
          </div>
          <div className="form-group-th">
            <label className="form-label-th">Total Price:</label>
            <p>₹{checkoutItem.price * checkoutItem.quantity}</p>
          </div>
          <div className="form-group-th">
            <label className="form-label-th">Payment Method:</label>
            <select
              className="form-select-th"
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                if (e.target.value === "Online Payment") {
                  setShowFullScreenPayment(true); // Show full-screen payment
                } else {
                  setShowFullScreenPayment(false); // Hide full-screen payment
                }
              }}
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Online Payment">Online Payment</option>
            </select>
          </div>

          {/* Show Place Order button for Cash on Delivery */}
          {paymentMethod === "Cash on Delivery" && (
            <button className="place-order-th" onClick={handleOrder}>
              Place Order
            </button>
          )}
        </div>
      )}

      {/* Full-screen Payment Prompt */}
      {showFullScreenPayment && (
        <div className="fullscreen-payment-th">
          <div className="fullscreen-payment-content-th">
            <Payment
              productName={checkoutItem.name} // Pass product name
              productImage={checkoutItem.image} // Pass product image URL
              onPaymentSuccess={() => {
                setIsPaymentSuccessful(true);
                removeFromCart(checkoutItem._id); // Remove product from cart
                setCheckoutItem(null); // Reset checkout item
                setShowFullScreenPayment(false); // Close full-screen payment
              }}
              onPaymentFailure={(message) => {
                alert(message); // Show payment failure message
                setShowFullScreenPayment(false); // Close full-screen payment
              }}
              onClose={() => setShowFullScreenPayment(false)} // Close full-screen payment
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;