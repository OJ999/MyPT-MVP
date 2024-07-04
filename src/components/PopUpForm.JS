import React from 'react';

const PopupForm = () => {
  const registerUser = (event) => {
    event.preventDefault();
    const fullName = document.getElementById("popupFullName").value.trim();
    const username = document.getElementById("popupUsername").value.trim();
    const password = document.getElementById("popupPassword").value.trim();
    const email = document.getElementById("popupEmail").value.trim();
    const category = document.getElementById("category").value;

    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, username, password, email, category })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'User registered successfully') {
        alert('Registration successful');
        document.getElementById("popupContainer").style.display = "none";
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div id="popupContainer">
      <span className="close" onClick={() => document.getElementById("popupContainer").style.display = "none"}>&times;</span>
      <h2>Sign Up</h2>
      <form id="popup" onSubmit={registerUser}>
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
  );
};

export default PopupForm;
