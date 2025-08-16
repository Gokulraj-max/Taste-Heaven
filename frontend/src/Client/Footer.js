import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin, faPinterest } from "@fortawesome/free-brands-svg-icons";
import AboutUsModal, { ServicesModal, SupportModal, PartnerModal, TermsModal, PrivacyModal, CookieModal } from "./AboutUsModel";
import "./Footer.css";

const Footer = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-logo">
                <h2 className="brand-name1">Taste</h2>
                <h2 className="brand-name2">Heaven</h2>
                <div className="copyright">
                  <p>© 2025 TasteHeaven.</p>
                  <p>All rights reserved.</p>
                </div>
              </div>

              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li onClick={() => openModal("about")}>About Us</li>
                  <li onClick={() => openModal("services")}>Our Services</li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Contact Us</h4>
                <ul>
                  <li onClick={() => openModal("support")}>Help & Support</li>
                  <li onClick={() => openModal("partner")}>Partner with Us</li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Legal</h4>
                <ul>
                  <li onClick={() => openModal("terms")}>Terms & Conditions</li>
                  <li onClick={() => openModal("privacy")}>Privacy Policy</li>
                  <li onClick={() => openModal("cookies")}>Cookie Policy</li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Social Links</h4>
                <div className="social-icons">
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                    <FontAwesomeIcon icon={faPinterest} />
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Modals */}
      <AboutUsModal isOpen={modalType === "about"} onClose={closeModal} />
      <ServicesModal isOpen={modalType === "services"} onClose={closeModal} />
      <SupportModal isOpen={modalType === "support"} onClose={closeModal} />
      <PartnerModal isOpen={modalType === "partner"} onClose={closeModal} />
      <TermsModal isOpen={modalType === "terms"} onClose={closeModal} />
      <PrivacyModal isOpen={modalType === "privacy"} onClose={closeModal} />
      <CookieModal isOpen={modalType === "cookies"} onClose={closeModal} />
    </>
  );
};

export default Footer;


// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faTwitter,
//   faInstagram,
//   faLinkedin,
//   faPinterest,
// } from "@fortawesome/free-brands-svg-icons";
// import AboutUsModal, {
//   ServicesModal,
//   SupportModal,
//   PartnerModal,
//   TermsModal,
//   PrivacyModal,
//   CookieModal,
// } from "./AboutUsModel";
// import "./Footer.css";

// const Footer = () => {
//   const [modalType, setModalType] = useState(null);

//   const openModal = (type) => {
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setModalType(null);
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <div className="content">
//           <footer className="footer">
//             <div className="footer-content">
//               <div className="footer-logo">
//                 <h2 className="brand-name">TasteHeaven</h2>
//                 <div className="copyright">
//                   <p>© 2025 TasteHeaven.</p>
//                   <p>All rights reserved.</p>
//                 </div>
//               </div>

//               <div className="footer-column">
//                 <h4>Company</h4>
//                 <ul>
//                   <li onClick={() => openModal("about")}>About Us</li>
//                   <li onClick={() => openModal("services")}>Our Services</li>
//                 </ul>
//               </div>

//               <div className="footer-column">
//                 <h4>Contact Us</h4>
//                 <ul>
//                   <li onClick={() => openModal("support")}>Help & Support</li>
//                   <li onClick={() => openModal("partner")}>Partner with Us</li>
//                 </ul>
//               </div>

//               <div className="footer-column">
//                 <h4>Legal</h4>
//                 <ul>
//                   <li onClick={() => openModal("terms")}>Terms & Conditions</li>
//                   <li onClick={() => openModal("privacy")}>Privacy Policy</li>
//                   <li onClick={() => openModal("cookies")}>Cookie Policy</li>
//                 </ul>
//               </div>

//               <div className="footer-column">
//                 <h4>Social Links</h4>
//                 <div className="social-icons">
//                   <a
//                     href="https://www.linkedin.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="LinkedIn"
//                   >
//                     <FontAwesomeIcon icon={faLinkedin} />
//                   </a>
//                   <a
//                     href="https://www.instagram.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Instagram"
//                   >
//                     <FontAwesomeIcon icon={faInstagram} />
//                   </a>
//                   <a
//                     href="https://www.facebook.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Facebook"
//                   >
//                     <FontAwesomeIcon icon={faFacebook} />
//                   </a>
//                   <a
//                     href="https://www.pinterest.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Pinterest"
//                   >
//                     <FontAwesomeIcon icon={faPinterest} />
//                   </a>
//                   <a
//                     href="https://www.twitter.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Twitter"
//                   >
//                     <FontAwesomeIcon icon={faTwitter} />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </div>

//       {/* Modals */}
//       <AboutUsModal isOpen={modalType === "about"} onClose={closeModal} />
//       <ServicesModal isOpen={modalType === "services"} onClose={closeModal} />
//       <SupportModal isOpen={modalType === "support"} onClose={closeModal} />
//       <PartnerModal isOpen={modalType === "partner"} onClose={closeModal} />
//       <TermsModal isOpen={modalType === "terms"} onClose={closeModal} />
//       <PrivacyModal isOpen={modalType === "privacy"} onClose={closeModal} />
//       <CookieModal isOpen={modalType === "cookies"} onClose={closeModal} />
//     </>
//   );
// };

// export default Footer;