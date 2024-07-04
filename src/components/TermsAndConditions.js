import React from 'react';

const TermsAndConditions = () => {
  const continueToNextPage = () => {
    const checkbox = document.getElementById("agree");
    if (checkbox.checked) {
      alert("You have agreed to the terms and conditions.");
      window.location.href = "User1.html"; 
    } else {
      alert("You must agree to the terms and conditions before continuing.");
    }
  };

  return (
    <section id="terms" className="terms">
      <div className="container">
        <div className="terms-box">
          <div className="section-title">
            <h2>My-PT Terms and Conditions</h2>
          </div>
          <div className="terms-box2">
            <div className="terms-content">
              <p>
                By accessing or using the My-PT application ("My-PT" or the "Application") provided by [Owner Name] ("Owner" or "We" or "Us" or "Company"), you agree to comply with these Terms and Conditions, which constitute a legally binding agreement between you and the Owner. These Terms and Conditions govern your use of My-PT, including any updates, enhancements, or modifications made to the Application over time. Please read these Terms and Conditions carefully before using My-PT.
              </p>
              {/* Add the rest of the terms and conditions content here */}
            </div>
          </div>
          <div className="terms-agreement">
            <input type="checkbox" id="agree" name="agree" required />
            <label htmlFor="agree">I agree to the terms and conditions</label>
          </div>
          <div className="terms-button">
            <button type="button" className="btn btn-primary" onClick={continueToNextPage}>Continue</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
