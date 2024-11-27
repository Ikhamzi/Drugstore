import React from 'react';
import './styles/Navbar.css'; // Corrected import path

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">Redcross</a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
            <a className="nav-link" href="#">Features</a>
            <a className="nav-link" href="#">Pricing</a>
          </div>
        </div>

        {/* Login and Register Buttons */}
        <div className="d-flex">
          <button className="btn btn-outline-primary me-2" type="button">Login</button>
          <button className="btn btn-outline-secondary" type="button">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
