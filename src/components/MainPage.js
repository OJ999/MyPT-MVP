/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/MainPage.css';

const MainPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const userData = response.data;

      if (userData) {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        if (userData.category === 'PersonalTrainer') {
          history.push('/HomePage');
        } else {
          history.push('/user1');
        }
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      alert('Invalid username or password.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', { username: regUsername, password: regPassword });

      if (response.status === 201) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        history.push('/termsconditions');
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Registration failed.');
      }
    }
  };

  const showPopup = () => setPopupVisible(true);
  const hidePopup = () => setPopupVisible(false);

  useEffect(() => {
    const texts = ["Train!", "Eat!", "Sleep!", "Repeat!"];
    let index = 0;

    const typeText = (text) => {
      return new Promise((resolve) => {
        const element = document.getElementById('animated-text');
        if (element) {
          element.textContent = text;
          element.classList.add('typing');
          setTimeout(() => {
            if (element) element.classList.remove('typing');
            resolve();
          }, 2000); // Adjusted duration for more professional look
        } else {
          resolve();
        }
      });
    };

    const eraseText = () => {
      return new Promise((resolve) => {
        const element = document.getElementById('animated-text');
        if (element) {
          element.classList.add('erasing');
          setTimeout(() => {
            if (element) {
              element.textContent = '';
              element.classList.remove('erasing');
            }
            resolve();
          }, 1000); // Adjusted duration for more professional look
        } else {
          resolve();
        }
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
    <body className='MainPagebody'> 
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
            <input type="text" id="popupUsername" placeholder="Username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required />
            <input type="password" id="popupPassword" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
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
    </body>
  );
};

export default MainPage;
