import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaConciergeBell, FaTag, FaUtensils, FaShoppingCart, 
  FaPhoneAlt, FaUser, FaClipboardList, FaSignOutAlt, FaSignInAlt 
} from 'react-icons/fa'; 
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed
import './Navbar1.css';
import Taste from '../assets/images/TasteH.png';

const Navbar1 = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleNav = () => setIsNavVisible(!isNavVisible);
  const closeNav = () => setIsNavVisible(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.navbar1-nav-list') && !event.target.closest('.navbar1-nav-icon')) {
        closeNav();
      }
    };

    if (isNavVisible) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }

    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isNavVisible]);

  // Handle Logout Function
  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!", { position: "top-right", autoClose: 2000 });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <nav className="navbar1-container">
        {/* Left Logo */}
        <div className="navbar1-logo">
          <img src={Taste} alt="Taste Heaven Logo" />
        </div>

        {/* Middle Nav List */}
        <div className="navbar1-middle-nav">
          <ul>
            <li><a href="/services"><FaConciergeBell /> Service</a></li>
            <li><a href="/offers"><FaTag /> Offers</a></li>
            <li><a href="/products"><FaUtensils /> Foods</a></li>
            <li><a href="/cart"><FaShoppingCart /> Cart</a></li>
            <li><a href="/contact"><FaPhoneAlt /> Contact</a></li>
          </ul>
        </div>

        {/* Right Menu Icon */}
        <button 
          className="navbar1-nav-icon" 
          onClick={toggleNav} 
          aria-label="Toggle navigation"
          aria-expanded={isNavVisible}
          aria-controls="mobile-menu"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isNavVisible && (
          <div className="navbar1-nav-list" id="mobile-menu">
            <ul>
              {user ? (
                <>
                  <li><a href="/profile/edit-profile"><FaUser /> Profile</a></li>
                  <li><a href="/orders"><FaClipboardList /> Orders</a></li>
                  <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <FaSignOutAlt /> Logout
                  </li>
                </>
              ) : (
                <li onClick={() => navigate('/login')} style={{ cursor: "pointer" }}>
                  <FaSignInAlt /> Sign In
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Toast Container for showing notifications */}
      <ToastContainer />
    </>
  );
};

export default Navbar1;
