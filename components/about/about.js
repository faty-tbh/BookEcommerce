import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './about.css';


function About() {
  return (
    
    <div className="Acc">
      <div className="headeracc">
        <div className="logoacc">BOOKS CAPITAL</div>
       
      </div>
      <div className="container">
        <h1>BOOKS Capital</h1>
        <p>Feel free to customize this template to better reflect the unique identity and offerings of your online bookstore.</p>
        <center>
            <button ><Link to="/welcome" className="login-button">Back</Link></button></center>
        <div className="image-right"></div>
      </div>
    </div>
  );
}

export default About;