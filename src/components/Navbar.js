import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">TicOut</Link>
        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/movies" className="navbar-link">Movies</Link></li>
          <li><Link to="/event" className="navbar-link">Events</Link></li>
        </div>
        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`navbar-menu-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/movies" className="navbar-link">Movies</Link></li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
