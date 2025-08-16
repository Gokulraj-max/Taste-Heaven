import React from "react";
import "./ZomatoStyle.css";
import sample1 from "../assets/images/pizza.jpg";
import Dinning from "../assets/images/dinning.jpg";
import logo from '../assets/images/TasteH.png';

function ZomatoStylePage() {
  return (
    <div className="home_Zomatostyle">
      <div className="home_App">
        <header className="home_header">
          <nav className="home_navbar">
            <div className="home_logo">
              <img src={logo} alt="Login Logo" className="home_signup-logo" />
            </div>
            <ul className="home_nav-links">
              {/* Show Sign In link for everyone */}
              <li className="home_nav-item">
                <a href="/login" className="home_signin-link">
                  Sign In
                </a>
              </li>
            </ul>
          </nav>
          <div className="home_hero-section">
            <h1 className="home_hero-title">Discover the best food & drinks in Taste Heaven</h1>
            <div className="home_search-bar">
              <a href="/search">
                <input
                  type="text"
                  placeholder="Search for dish"
                  className="home_search-input"
                />
              </a>
            </div>
          </div>
        </header>

        <section className="home_services">
          <div className="home_service-card">
            <img src={sample1} alt="Order Online" className="home_service-image" />
            <a href="/login" className="home_service-link">
              <h2 className="home_service-title">Order Online</h2>
            </a>
            <p className="home_service-description">Stay home and order to your doorstep</p>
          </div>

          <div className="home_service-card">
            <img src={Dinning} alt="Dining" className="home_service-image" />
            <a href="/login" className="home_service-link">
              <h2 className="home_service-title">Dining</h2>
            </a>
            <p className="home_service-description">View the favorite dining venues</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ZomatoStylePage;