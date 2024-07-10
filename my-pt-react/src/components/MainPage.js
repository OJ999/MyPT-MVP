/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../assets/css/MainPage.css';

const MainPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add sign-in logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  const showPopup = () => setPopupVisible(true);
  const hidePopup = () => setPopupVisible(false);

  useEffect(() => {
    const texts = ["Train!", "Eat!", "Sleep!", "Repeat!"];
    let index = 0;

    const typeText = (text) => {
      return new Promise((resolve) => {
        const element = document.getElementById('animated-text');
        element.textContent = text;
        element.classList.add('typing');
        setTimeout(() => {
          element.classList.remove('typing');
          resolve();
        }, 2000); // Adjusted duration for more professional look
      });
    };

    const eraseText = () => {
      return new Promise((resolve) => {
        const element = document.getElementById('animated-text');
        element.classList.add('erasing');
        setTimeout(() => {
          element.textContent = '';
          element.classList.remove('erasing');
          resolve();
        }, 1000); // Adjusted duration for more professional look
      });
    };

    const animateText = async () => {
      while (true) {
        await typeText(texts[index]);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Pause between typing and erasing
        await eraseText();
        index = (index + 1) % texts.length;
      }
    };

    animateText();
  }, []);

  return (
    <div className="mainpage-container" data-aos="zoom-in" data-aos-delay="1000">
      <h1>My PT</h1>
      <p>I Will <span id="animated-text-container"><span id="animated-text"></span></span></p>
      <form id="signupForm" className="mainpage-form" onSubmit={handleSignIn}>
        <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Sign In" />
      </form>
      <button id="Register" onClick={showPopup}>Register Now</button>
      {popupVisible && (
        <div id="popupContainer" className="mainpage-popup-container">
          <form id="popup" className="mainpage-popup" onSubmit={handleRegister}>
            <span className="close" onClick={hidePopup}>&times;</span>
            <input type="text" id="popupFullName" placeholder="Full Name" required />
            <input type="text" id="popupUsername" placeholder="Username" required />
            <input type="password" id="popupPassword" placeholder="Password" required />
            <input type="email" id="popupEmail" placeholder="Email / Phone Number" required />
            <label htmlFor="category">Select Category:</label>
            <select name="category" id="category" required>
              <option value="" disabled selected> - </option>
              <option value="PersonalTrainer">Personal Trainer</option>
              <option value="Client">Client / Other</option>
            </select>
            <br />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      )}
      <div id="social-media" className="mainpage-social-media">
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  );
};

export default MainPage;
