import React from 'react';
import { Link } from 'react-router-dom';
import './cart.css'; // Import your CSS styles as needed

function ThankYouPage() {
  return (
    <div className="thank-you-container">
      <h1>Thank you.</h1>
      <h3>Your order was completed successfully.</h3>
      <div className="email-receipt">
        {/* <img src="./mail.jpg" alt="" /> */}
        <p>An email receipt including the details about your order has been sent to the email address provided. Please keep it for your records.</p>
      </div>
      <Link to="/home" className="home-button">Home</Link> {/* Adjust the `to` prop as needed for your routing */}
    </div>
  );
}

export default ThankYouPage;