
// import React, { createContext, useContext, useReducer, useEffect } from 'react';

// // Create the Cart Context
// const CartContext = createContext();

// // Reducer function for cart actions
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      
//       // If item already exists, update quantity, otherwise add new item
//       if (existingItemIndex !== -1) {
//         const updatedState = [...state];
//         updatedState[existingItemIndex].quantity += action.payload.quantity; // update quantity
//         return updatedState;
//       }

//       return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
      
//     case 'REMOVE_FROM_CART':
//       return state.filter(item => item.id !== action.payload);
      
//     case 'CLEAR_CART':
//       return [];
      
//     case 'UPDATE_QUANTITY':
//       return state.map(item =>
//         item.id === action.payload.id
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       );
      
//     default:
//       return state;
//   }
// };

// // Cart provider component
// export const CartProvider = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
//     // Initialize cart from localStorage if available
//     const savedCart = JSON.parse(localStorage.getItem('cart'));
//     return savedCart || initial;
//   });

//   // Persist cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Action functions
//   const addToCart = (product) => {
//     dispatch({ type: 'ADD_TO_CART', payload: product });
//   };

//   const removeFromCart = (productId) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
//   };

//   const clearCart = () => {
//     dispatch({ type: 'CLEAR_CART' });
//   };

//   const updateQuantity = (productId, quantity) => {
//     dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use cart context
// export const useCart = () => {
//   return useContext(CartContext);
// };








































import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Reducer function for cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.findIndex(item => item._id === action.payload._id);
      if (existingItemIndex !== -1) {
        return state.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload);
    case 'CLEAR_CART':
      return [];
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item
      );
    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      return savedCart || [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const updateQuantity = (productId, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { _id: productId, quantity } });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
