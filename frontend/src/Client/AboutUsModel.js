import { useState } from "react";
import "./AboutUsModel.css";

export default function AboutUsModal({ isOpen, onClose }) {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <button className="close-icon" onClick={onClose}>×</button>
          <h2 className="modal-title">About TasteHeaven</h2>
          <p>
            Welcome to TasteHeaven, where we bring you the finest dining experience.
            Enjoy our delicious meals, top-notch services, and special event bookings.
            TasteHeaven is dedicated to offering premium quality food and a memorable
            experience for every customer.
          </p>
          <p>
            Our restaurant offers a wide variety of cuisines made from fresh and high-quality ingredients.
            Whether you’re dining in, ordering takeaway, or planning an event, we ensure the best service
            and satisfaction for our customers.
          </p>
          <p>
            Visit us today and embark on a delightful culinary journey with TasteHeaven!
          </p>
        </div>
      </div>
    )
  );
}
export function CookieModal({ isOpen, onClose }) {
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-icon" onClick={onClose}>×</button>
            <h2 className="modal-title">Cookie Policy</h2>
            <p>
              Learn how TasteHeaven uses cookies to enhance your browsing experience.
            </p>
          </div>
        </div>
      )
    );
  }

  export function PartnerModal({ isOpen, onClose }) {
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-icon" onClick={onClose}>×</button>
            <h2 className="modal-title">Partner with Us</h2>
            <p>
              Join hands with TasteHeaven and be a part of our growing community.
              We welcome partnerships that align with our vision.
            </p>
          </div>
        </div>
      )
    );
  }

  export function PrivacyModal({ isOpen, onClose }) {
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-icon" onClick={onClose}>×</button>
            <h2 className="modal-title">Privacy Policy</h2>
            <p>
              We prioritize your privacy. Read our policy to understand how we handle your personal data.
            </p>
          </div>
        </div>
      )
    );
  }
  export function ServicesModal({ isOpen, onClose }) {
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-icon" onClick={onClose}>×</button>
            <h2 className="modal-title">Our Services</h2>
            <p>
              TasteHeaven offers a range of services, including fine dining, catering, and special event planning.
              Our goal is to make every meal an unforgettable experience.
            </p>
          </div>
        </div>
      )
    );
  }

  export function SupportModal({ isOpen, onClose }) {
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-icon" onClick={onClose}>×</button>
            <h2 className="modal-title">Help & Support</h2>
            <p>
              Need assistance? Our support team is here to help you with any inquiries regarding our services.
            </p>
          </div>
        </div>
      )
    );
  }
  
  export function TermsModal({ isOpen, onClose }) {
    return (
      isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-icon" onClick={onClose}>×</button>
            <h2 className="modal-title">Terms & Conditions</h2>
            <p>
              By using TasteHeaven, you agree to our terms and conditions.
              Please review them carefully before proceeding.
            </p>
          </div>
        </div>
      )
    );
  }
  