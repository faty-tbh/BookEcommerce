import React, { useEffect, useState } from 'react';
import './check.css';
import { useLocation } from 'react-router-dom';

function Check() {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const [total, setTotal] = useState(location.state?.book?.total || '0');
  const [titles, setTitles] = useState(location.state?.book?.titles || []);

  useEffect(() => {
    if (location.state && location.state.book) {
      setTotal(location.state.book.total);
      setTitles(location.state.book.titles);
      console.log(location.state.book);
    } else {
      console.log("No state passed from the Cart component.");
    }
  }, [location]);

  const formatCardNumber = (number) => {
    return number.replace(/(.{4})/g, '$1 ').trim();
  };

  const handlePayment = async () => {
    const paymentData = {
      email,
      cardholderName,
      cardNumber,
      total,
      titles
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      console.log(paymentData)

      if (response.ok) {
        console.log('Payment successful!');
        // Handle success scenario
      } else {
        console.error('Payment failed!');
        // Handle failure scenario
      }
    } catch (error) {
      console.error('Error occurred while processing payment:', error);
      // Handle error scenario
    }
  };

  return (
    <div className="payment-container">
      <div className="card-container">
        <div className="card">
          <div className="card-details">
            <div className="card-brand">PAYPAL CARD</div>
            <br /> <br /> <br />
            <div className="card-number">{cardNumber ? formatCardNumber(cardNumber) : '**** **** **** ****'}</div>
            <div className="card-holder">{cardholderName || 'FULL NAME'}</div>
            <br />
            <div className="card-expiry">
              <div>{expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear.slice(-2)}` : 'MM/YY'}</div><br />
            </div>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Cardholder Name</label>
          <input type="text" placeholder="John Smith" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Card Number</label>
          <input type="text" placeholder="4256 7890 5678 4532" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Expiry Month</label>
          <input type="text" placeholder="09" value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Expiry Year</label>
          <input type="text" placeholder="2020" value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} />
        </div>
        <div className="input-group">
          <label>CVC</label>
          <input type="text" placeholder="145" value={cvc} onChange={(e) => setCvc(e.target.value)} />
        </div>
        <button className="pay-button" onClick={handlePayment}>PAY</button>
      </div>
    </div>
  );
}

export default Check;
