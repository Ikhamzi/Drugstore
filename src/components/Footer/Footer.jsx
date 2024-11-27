import React from 'react';
import './footer.css'; // Ensure this path is correct

const Footer = () => {
  return (
    <footer className="footer fixed-bottom bg-dark text-center text-lg-start">
      <div className="container p-3">
        <div className="row">
          {/* Left section with the company description */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Redcross Communtiy</h5>
            <p>
              Your trusted partner in health and wellness. We provide a wide range of pharmaceutical products and services to meet your healthcare needs.
            </p>
          </div>

          {/* Contact Us section aligned to the right */}
          <div className="col-lg-5 col-md-6 mb-4 mb-md-0 ms-auto">
            <h5 className="text-uppercase">Contact Us</h5>
            <div class="row">
              <div class="col">
                <p className="text-dark">123 Pharmacy St, Health City, HC 12345</p>
              </div>
              <div class="col">
                <p className="text-dark">Phone: (123) 456-7890</p>
              </div>
              <div class="col">
                <p className="text-dark">Email: info@drugstore.com</p>
              </div>
          </div>
        </div>
        </div>
      </div>

      {/* Footer copyright section */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Drugstore Pharmacist. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
