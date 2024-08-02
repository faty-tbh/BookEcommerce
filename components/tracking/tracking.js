import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaList, FaSearch } from 'react-icons/fa';
import './tracking.css';

function Track() {
  const [showTracker, setShowTracker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  // Define the sequence of order statuses
  const statusSequence = ['In Process', 'Shipped', 'Out for Delivery', 'Delivered'];

  // Check if the current status is the same as or follows a given status in the order process
  const isStatusCompleted = (status) => {
    const currentIndex = statusSequence.indexOf(orderStatus);
    const statusIndex = statusSequence.indexOf(status);
    return currentIndex >= statusIndex;
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = event.target.search_query.value.trim();

    if (searchQuery) {
      setShowTracker(false); // Initially hide the tracker while fetching the status
      setErrorMessage('');

      try {
        // Here you would make an API call to your Flask backend
        const response = await fetch('http://127.0.0.1:5000/tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_id: searchQuery }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrderStatus(data.status); // Assuming the response has a 'status' field
          setShowTracker(true);
        } else {
          setErrorMessage('Order ID does not exist!');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('Please type the order ID that you received on your email address');
    }
  };
  return (
    <div className='all'>
      <header className="header">
        <nav className="navbaro">
          <div className="logoacc">BOOKS CAPITAL</div>
        </nav>
        <div className='long'>
          <p>n</p>
        </div>
      </header>
      <main className="track">
        <center>
          <form onSubmit={handleSearch}>
            <h3>Type Your Order Id</h3>
            <input type="text" name="search_query" placeholder="Search..." className='inputtrack' />
            <button type="submit" className="search-button"><FaSearch /></button>
          </form><br />
          <br />
          {errorMessage && <p>{errorMessage}</p>}
          {showTracker && (
            <div className="progress-tracker">
              {statusSequence.map((status, index) => (
                <React.Fragment key={status}>
                  {/* Apply the 'green' class based on isStatusCompleted */}
                  <div className={`step ${isStatusCompleted(status) ? 'green' : ''}`}>
                    <div className="step-icon">✔</div>
                    <div className="step-label">{status}</div>
                  </div>
                  {/* Apply the 'green' class to the connector if the next status is completed */}
                  {index < statusSequence.length - 1 && (
                    <div className={`connector ${isStatusCompleted(statusSequence[index + 1]) ? 'green' : ''}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </center>
      </main>
      <center>
        <h4 className='hk'>for more infos, contact publishour@gmail.com</h4>
      </center>

           <footer className="footerr">
                <div className="footer-iconn">
                <Link className='jsp' to='/home'>
                    <FaHome />
                    </Link>
                    <span>Home</span>
                </div>
                <div className="footer-iconn">
                    <Link className='jsp' to='/category'>
                    <FaList />
                    </Link>
                    <span>Category</span>
                </div>
            </footer>
        </div>
    );
}

export default Track;
