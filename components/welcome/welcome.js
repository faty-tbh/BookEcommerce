import React from 'react';
import bookstoreImage from './rereading-books.webp';
import { Link } from 'react-router-dom';
import './welcome.css'; // Make sure this path is correct for your project

const WaveSeparator = () => {
  return (
    <svg viewBox="0 0 500 150" className='soso' preserveAspectRatio="none" style={{ height: '200px', width: '100%' }}>
      <path 
        d="M0.00,49.98 C150.00,150.00 350.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
        style={{ stroke: 'none', fill: '#2d7c4e' }}>
      </path>
    </svg>
  );
};

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="content">
        <div className="text-section">
          <h1>WELCOME TO BOOK STORE</h1>
          <p>Feel free to customize this template to better reflect the unique identity and offerings of your online bookstore.</p>
          <button className='button'><Link to="/signin" className="login-button">Start</Link></button>
        </div>
        <div className="image-sectiono">
          <img src={bookstoreImage} alt="Person sitting on a stack of books" />
        </div>
      </div>
      <WaveSeparator />
    </div>
  );
};

export default Welcome;