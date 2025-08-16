
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext";

// // Import Components
// import Home from "./Components/Home";
// import Services from "./Components/Services";
// import Orders from "./Components/Orders";
// import Contact from "./Components/ContactUs";
// import Product from "./Components/Products";
// import FoodOrders from "./Components/FoodsOrders";
// import ServiceOrders from "./Components/ServiceBook";
// import Carts from "./Components/Cart";
// import ZomatoStylePage from "./Client/ZomatoStylePage";
// import Login from "./Components/LoginAndRegister";
// import Searches from "./Components/Search";
// import Payment from "./Client/Payment";
// import ProfilePage from "./Components/Profile";
// import OffersPage from "./Components/Offers";
// import About from "./Client/AboutUsModel";
// import WeddingEventBooking from "./Components/WeddingEvent";
// import BirthdayEventBooking from "./Components/Birthday";
// import FamilyEventBooking from "./Components/Family";
// import CateringPage from "./Components/Catering";
// import ForgotPassword from "./Client/ForgotPassword";

// // Admin Pages
// import AdminLayout from "./layouts/AdminLayout";
// import Dashboard from "./admin/Dashboard";
// import AdminOrders from "./admin/Orders";
// import AdminProducts from "./admin/Products";
// import AdminServices from "./admin/Services";
// import AdminOffers from "./admin/Offers";
// import AdminUsers from "./admin/Users";
// import AdminSettings from "./admin/Settings";


// import { CartProvider } from "./contexts/CartContext"; 
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AboutUsModal from "./Client/AboutUsModel";

// const ProtectedRoute = ({ element }) => {
//   const { user } = useAuth();
//   return user ? element : <Navigate to="/login" />;
// };

// const App = () => {
//   return (
//     <CartProvider>
//       <ToastContainer />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/search" element={<Searches />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/contact" element={<AboutUsModal />} />

//         {/* Protected User Routes */}
//         <Route path="/services" element={<ProtectedRoute element={<Services />} />} />
//         <Route path="/products" element={<ProtectedRoute element={<Product />} />} />
//         <Route path="/cart" element={<ProtectedRoute element={<Carts />} />} />
//         {/* <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} /> */}
//         <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
//         <Route path="/foodOrders" element={<ProtectedRoute element={<FoodOrders />} />} />
//         <Route path="/service-orders" element={<ProtectedRoute element={<ServiceOrders />} />} />
//         <Route path="/profile/*" element={<ProtectedRoute element={<ProfilePage />} />} />
//         <Route path="/offers" element={<ProtectedRoute element={<OffersPage />} />} />

//         {/* Booking Routes */}
//         <Route path="/booking/birthday" element={<ProtectedRoute element={<BirthdayEventBooking />} />} />
//         <Route path="/booking/catering" element={<ProtectedRoute element={<CateringPage />} />} />
//         <Route path="/booking/family" element={<ProtectedRoute element={<FamilyEventBooking />} />} />
//         <Route path="/booking/wedding" element={<ProtectedRoute element={<WeddingEventBooking />} />} />

//         {/* Admin Routes */}
//         <Route path="/admin/*" element={<ProtectedRoute element={<AdminLayout />} />}>
//           <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
//           <Route path="orders" element={<ProtectedRoute element={<AdminOrders />} />} />
//           <Route path="products" element={<ProtectedRoute element={<AdminProducts />} />} />
//           <Route path="services" element={<ProtectedRoute element={<AdminServices />} />} />
//           <Route path="offers" element={<ProtectedRoute element={<AdminOffers />} />} />
//           <Route path="users" element={<ProtectedRoute element={<AdminUsers />} />} />
//           <Route path="settings" element={<ProtectedRoute element={<AdminSettings />} />} />
//         </Route>
//       </Routes>
//     </CartProvider>
//   );
// };

// export default App;



import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// Import Components
import Home from "./Components/Home";
import Services from "./Components/Services";
import Orders from "./Components/Orders";
import Contact from "./Components/ContactUs";
import Product from "./Components/Products";
import FoodOrders from "./Components/FoodsOrders";
import ServiceOrders from "./Components/ServiceBook";
import Carts from "./Components/Cart";
import ZomatoStylePage from "./Client/ZomatoStylePage";
import Login from "./Components/LoginAndRegister";
import Searches from "./Components/Search";
import Payment from "./Client/Payment";
import ProfilePage from "./Components/Profile";
import OffersPage from "./Components/Offers";
import WeddingEventBooking from "./Components/WeddingEvent";
import BirthdayEventBooking from "./Components/Birthday";
import FamilyEventBooking from "./Components/Family";
import CateringPage from "./Components/Catering";
import ForgotPassword from "./Client/ForgotPassword";

// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminOrders from "./admin/Orders";
import AdminProducts from "./admin/Products";
import AdminServices from "./admin/Services";
import AdminOffers from "./admin/Offers";
import AdminUsers from "./admin/Users";
import AdminSettings from "./admin/Settings";

import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Client/Footer"; // Add the Footer component

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (adminOnly && !user.isAdmin) {
  //   return <Navigate to="/" />;
  // }

  return element;
};

const App = () => {
  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Searches />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       

        {/* Protected User Routes */}
        <Route path="/services" element={<ProtectedRoute element={<Services />} />} />
        <Route path="/products" element={<ProtectedRoute element={<Product />} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Carts />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
        <Route path="/foodOrders" element={<ProtectedRoute element={<FoodOrders />} />} />
        <Route path="/service-orders" element={<ProtectedRoute element={<ServiceOrders />} />} />
        <Route path="/profile/*" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/offers" element={<ProtectedRoute element={<OffersPage />} />} />
        <Route path="/contact"  element={<ProtectedRoute element={<Contact />} />} />

        {/* Booking Routes */}
        <Route path="/booking/birthday" element={<ProtectedRoute element={<BirthdayEventBooking />} />} />
        <Route path="/booking/catering" element={<ProtectedRoute element={<CateringPage />} />} />
        <Route path="/booking/family" element={<ProtectedRoute element={<FamilyEventBooking />} />} />
        <Route path="/booking/wedding" element={<ProtectedRoute element={<WeddingEventBooking />} />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<ProtectedRoute element={<AdminLayout />} adminOnly />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      {/* Footer Component */}
      {/* <Footer /> */}
    </CartProvider>
  );
};

export default App;