import React from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/TermsConditions.css';

const TermsConditions = () => {
  const history = useHistory();

  const continueToNextPage = () => {
    const currentUser = localStorage.getItem('currentUser');
    const userData = JSON.parse(currentUser);

    if (userData.category === 'PersonalTrainer') {
      history.push('/HomePage');
    } else {
      history.push('/user1');
    }
  };

  return (
    <div className="TC-container">
      <section id="terms" className="terms">
        <div className="container">
          <div className="terms-box">
            <div className="section-title">
              <h2>My-PT Terms and Conditions</h2>
            </div>
            <div className="terms-box2">
              <div className="terms-content">
                {/* Your terms and conditions content */}
              </div>
            </div>
            <div className="terms-agreement">
              <input type="checkbox" id="agree" name="agree" required />
              <label htmlFor="agree" required >I agree to the terms and conditions</label>
            </div>
            <div className="terms-button">
              <button type="button" className="btn btn-primary" onClick={continueToNextPage}>Continue</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
