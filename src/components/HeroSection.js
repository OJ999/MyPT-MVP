import React from 'react';

const HeroSection = () => {
  return (
    <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
      <div className="container" data-aos="zoom-in" data-aos-delay="1000">
        <h1>My PT</h1>
        <p>I will <span className="typed" data-typed-items="Train!, Eat!, Sleep!, Repeat!"></span></p>
        <form id="signupForm" className="form">
          <input type="text" id="username" placeholder="Username" required />
          <input type="password" id="password" placeholder="Password" required />
          <span className="password-error" id="passwordError"></span>
          <input type="submit" value="Sign In" />
        </form>
        <input id="Register" type="submit" value="Register Now" onClick={() => document.getElementById("popupContainer").style.display = "block"} />
        <div className="social-links">
          <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
          <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
          <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
          <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
