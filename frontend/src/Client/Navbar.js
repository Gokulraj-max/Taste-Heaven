import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTag, faQuestionCircle, faSignInAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Taste from '../assets/images/TasteH.png';
const Navbar = () => {
  return (
    <nav className="navbara">
      <div className="navbar-logoa">
        <img src={Taste} alt="Logo" />
      </div>
      <ul className="navbar-linksa">

        <li>
          <FontAwesomeIcon icon={faTag} /> <a href='offers'>Offers</a>
        </li>
        {/* <li>
          <FontAwesomeIcon icon={faQuestionCircle} /> <a href='help'> Help</a>
        </li> */}
        <li>
          <FontAwesomeIcon icon={faSignInAlt} /><a href='login'> Sign In</a>
        </li>
        {/* <li>
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
