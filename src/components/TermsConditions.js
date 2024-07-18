/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/TermsConditions.css';

const TermsConditions = () => {
  const history = useHistory();

  const continueToNextPage = () => {
    const currentUser = localStorage.getItem('currentUser');
    const userData = JSON.parse(currentUser);
    history.push('/HomePage');
  };

  return (
    <div className="terms-container">
      <section id="terms" className="terms">
        <div className="container">
          <div className="terms-box">
            <div className="section-title">
              <h2>My-PT Terms and Conditions</h2>
            </div>
            <div className="terms-box2">
              <div className="terms-content">
                <p>
                  By accessing or using the My-PT application ("My-PT" or the "Application") provided by [Owner Name] ("Owner" or "We" or "Us"
                  or "Company"), you agree to comply with these Terms and Conditions, which constitute a legally binding agreement between you
                  and the Owner. These Terms and Conditions govern your use of My-PT, including any updates, enhancements, or modifications made
                  to the Application over time. Please read these Terms and Conditions carefully before using My-PT.
                </p>
                <p>
                  1. Acceptance of Terms and Conditions: By accessing or using My-PT, you acknowledge that you have read, understood, and agree
                  to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, you may not access or use My-PT.
                </p>
                <p>
                  2. Age Requirement: You must be at least 18 years old to use My-PT. By accessing or using My-PT, you represent and warrant that
                  you are at least 18 years old and have the legal capacity to enter into these Terms and Conditions.
                </p>
                <p>
                  3. License: Subject to these Terms and Conditions, we grant you a limited, non-exclusive, non-transferable, revocable license
                  to use My-PT for your personal, non-commercial use. You may not modify, distribute, reproduce, or create derivative works based
                  on My-PT.
                </p>
                <p>
                  4. User Content: By submitting content to My-PT, including feedback, comments, or suggestions, you grant the Owner a worldwide,
                  non-exclusive, royalty-free, perpetual, irrevocable, and sublicensable license to use, reproduce, modify, adapt, publish,
                  translate, create derivative works from, distribute, and display such content in any form, media, or technology.
                </p>
                <p>
                  5. Intellectual Property: My-PT and all content, features, and functionality thereof are owned by the Owner or its licensors
                  and are protected by copyright, trademark, and other intellectual property laws. You may not use the trademarks "My-PT" and the
                  My-PT logo without the prior written consent of the Owner.
                </p>
                <p>
                  6. Use of My-PT: You agree not to use My-PT for any unlawful purpose or in violation of any applicable laws or regulations.
                  You further agree not to access or attempt to access My-PT by any means other than the interface provided by us.
                </p>
                <p>
                  7. Termination: We reserve the right to terminate or suspend your access to My-PT at any time and for any reason without prior
                  notice. Upon termination, your right to use My-PT will cease immediately.
                </p>
                <p>
                  8. Disclaimer of Warranties: My-PT is provided "as is" and "as available" without any warranties of any kind, express or implied.
                  We do not warrant that My-PT will be error-free or uninterrupted, that defects will be corrected, or that My-PT will meet your
                  requirements.
                </p>
                <p>
                  9. Limitation of Liability: In no event shall the Owner be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising out of or in connection with your use of My-PT.
                </p>
                <p>
                  10. Indemnification: You agree to indemnify, defend, and hold harmless the Owner and its affiliates, officers, directors,
                  employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees
                  arising out of or in connection with your use of My-PT.
                </p>
                <p>
                  11. Governing Law: These Terms and Conditions shall be governed by and construed in accordance with the laws of [Jurisdiction],
                  without regard to its conflict of law provisions.
                </p>
                <p>
                  12. Modifications to Terms and Conditions: We reserve the right to modify or update these Terms and Conditions at any time
                  without prior notice. Any changes to these Terms and Conditions will be effective immediately upon posting.
                </p>
                <p>
                  13. Severability: If any provision of these Terms and Conditions is found to be unlawful, void, or unenforceable, that provision
                  shall be deemed severable from these Terms and Conditions and shall not affect the validity and enforceability of any remaining
                  provisions.
                </p>
                <p>
                  14. Entire Agreement: These Terms and Conditions constitute the entire agreement between you and the Owner regarding your use
                  of My-PT, superseding any prior agreements or understandings between you and the Owner.
                </p>
                <p>
                  15. Contact Us: If you have any questions about these Terms and Conditions, please contact us at [contact email].
                </p>
                <p>
                  This expanded version elaborates on each section to provide users with a comprehensive understanding of their rights and
                  obligations when using My-PT.
                </p>
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
    </div>
  );
};

export default TermsConditions;
