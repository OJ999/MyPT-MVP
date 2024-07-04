import React from 'react';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <h3>My PT</h3>
        <p>Unlock your true potential and redefine your fitness journey with My PT.</p>
        <div className="social-links">
          <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
          <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
          <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
          <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
        </div>
        <div className="copyright">
          &copy; Copyright <strong><span>MyPT</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by OmarJaber
        </div>
      </div>
    </footer>
  );
};

export default Footer;
