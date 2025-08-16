// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Ensure this is correctly imported


// function Sidebar() {
//   const navigate = useNavigate();
//   const { logout } = useAuth(); // Get logout function from AuthContext

//   const handleSignOut = () => {
//     logout(); // Call the logout function from AuthContext
//     navigate('/login'); // Redirect to login page
//   };

//   const menuItems = [
//     { id: 'dashboard', path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
//     { id: 'orders', path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
//     { id: 'products', path: '/admin/products', icon: 'fas fa-utensils', label: 'Products' },
//     { id: 'services', path: '/admin/services', icon: 'fas fa-concierge-bell', label: 'Services' },
//     { id: 'offers', path: '/admin/offers', icon: 'fas fa-gift', label: 'Offers' },
//     { id: 'users', path: '/admin/users', icon: 'fas fa-users', label: 'Users' },
//     { id: 'settings', path: '/admin/settings', icon: 'fas fa-cog', label: 'Settings' },
//   ];

//   return (
//     <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
//       <div className="sidebar-sticky pt-3">
//         <ul className="nav flex-column">
//           {menuItems.map((item) => (
//             <li className="nav-item" key={item.id}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
//               >
//                 <i className={item.icon} /> {item.label}
//               </NavLink>
//             </li>
//           ))}
//           {/* Sign Out Button */}
//           <li className="nav-item">
//             <button className="nav-link btn btn-link bg-light" onClick={handleSignOut}>
//               <i className="fas fa-sign-out-alt" /> Sign Out
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Sidebar;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this is correctly imported
import './Sidebar.css'; // Import the CSS file for styling

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from AuthContext

  const handleSignOut = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Redirect to login page
  };

  const menuItems = [
    { id: 'dashboard', path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { id: 'orders', path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { id: 'products', path: '/admin/products', icon: 'fas fa-utensils', label: 'Products' },
    { id: 'services', path: '/admin/services', icon: 'fas fa-concierge-bell', label: 'Services' },
    { id: 'offers', path: '/admin/offers', icon: 'fas fa-gift', label: 'Offers' },
    { id: 'users', path: '/admin/users', icon: 'fas fa-users', label: 'Users' },
    { id: 'settings', path: '/admin/settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                <i className={item.icon} /> {item.label}
              </NavLink>
            </li>
          ))}
          {/* Sign Out Button */}
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt" /> Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;