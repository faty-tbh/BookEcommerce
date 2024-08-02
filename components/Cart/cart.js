import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaCamera, FaHeart, FaGlobe, FaHome, FaList } from 'react-icons/fa';
import './cart.css';
import StripeContainer from './StripeContainer';
import axios from 'axios';

function Cart() {
    
    const [cardholderName, setCardholderName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [shippingOption, setShippingOption] = useState('');
    const [email, setEmail] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [taxRate, setTaxRate] = useState(0.15);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/cart_items');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des articles du panier');
            }
            const cartItemsData = await response.json();
            setCartItems(cartItemsData);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (title) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/remove_item', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title })
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'article du panier');
            }
            const updatedCart = cartItems.filter(item => item.title !== title);
            setCartItems(updatedCart);
        } catch (error) {
            console.error(error);
        }
    };

    const updateQuantity = (bookId, newQuantity) => {
        const updatedCart = cartItems.map(item => {
            if (item.book_id === bookId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * taxRate;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };
    // const titles = cartItems.map(item => item.title);
    // const quantity = cartItems.map(item => item.quantity);
    const itemsWithQuantities = cartItems.map(item => [item.title, item.quantity]);
    const fullAddress = `${address}, ${city}, ${country}`;


    const handlePayment = async () => {
        // Construire l'objet à envoyer
        const paymentData = {
            cardholderName,
            email,
            totalPrice: calculateTotal(),
            fullAddress,
            
            // titles: titles,
            // quantity: quantity,  // Ajoutez la quantité ici
            items: itemsWithQuantities,
            cardNumber: '************' // Remplacez ceci par le véritable numéro de carte récupéré depuis le formulaire
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/process_payment', paymentData);
            console.log(response.data); // Log de la réponse de Flask
            // Effacer le panier après le paiement réussi si nécessaire
            setCartItems([]);
            window.location.href ="./success"
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <div className="logoacc">BOOKS CAPITAL</div>
                    <div className="search-icons-container">
                        <div className="search-container">
                            <input className="search-input" type="text" placeholder="Blazer" />
                            <button className="search-button"><FaSearch /></button>
                            <Link to="/camera" className="photo-search-button">
                                <FaCamera />
                            </Link>
                        </div>
                        <div className="icons-container">
                            <FaUser className="icon" />
                            <Link to="../cart" className="icon">
                                <FaShoppingCart />
                            </Link>
                            <FaHeart className="icon" />
                            <FaGlobe className="icon" />
                        </div>
                    </div>
                </nav>
                <div className="promo-banner">
                    <h2 className='upto'>Your book word</h2>
                </div>
            </header>
            <main>
                <div className="cart-container">
                    <div className="left-section">
                        <div className="cart-items-section">
                            <h1>My Cart</h1>< br />
                            {cartItems.map((item, index) => (
                                <div className="cart-item" key={index}>
                                    <div className="item-info">
                                    {item.image.startsWith('data:image') ||item.image.startsWith('http') ? (
                                       <img src={item.image} alt="" className="product-imagee" />
                                    ) : (
                                       <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} className="product-imagee" />
                                    )}
                                        <div className="product-details">
                                            <span className="product-price">{item.price} $</span>
                                            <h3>{item.title}</h3>
                                            <p>{item.language} Quantity: {item.quantity}</p>
                                            
                                            <div className="quantity-controls">
                                                <button onClick={() => updateQuantity(item.book_id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.book_id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button className="remove-item" onClick={() => removeFromCart(item.title)}>remove from cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="summary-section">
                            <h2>Order Total</h2>
                            <div className="summary-item">
                                <span>SubTotal:</span>
                                <span>{calculateSubtotal()} $</span>
                            </div>
                            <div className="summary-item">
                                <span>TAX:</span>
                                <span>{calculateTax().toFixed(2)} $</span>
                            </div>
                            <div className="summary-item">
                                <span>Total:</span>
                                <span>{calculateTotal().toFixed(2)} $</span>
                            </div>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="right-section">
  <center><h2>CheckOut</h2></center>
  <div className="">
    <center>
      <div className="input-groupp">
        <label>Email :  </label>
        <input type="email" placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-groupp">
        <label>Name   </label>
        <input type="text" placeholder="John Smith" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} />
      </div>
      <div className="input-groupp">
        <label>Address   </label>
        <input type="text" placeholder="1234 Street" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="input-groupp">
        <label>City</label>
        <input type="text" placeholder="Toronto" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div className="input-groupp">
        <label>Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
    <option value="">Select Country</option>
    <optgroup label="Africa">
        <option value="Nigeria">Nigeria</option>
        <option value="South Africa">South Africa</option>
        <option value="Egypt">Egypt</option>
        <option value="Kenya">Morocco</option>
    </optgroup>
    <optgroup label="Asia">
        <option value="China">China</option>
        <option value="South Korea">South Korea</option>
        <option value="Japan">Japan</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
    </optgroup>
    <optgroup label="Europe">
        <option value="Germany">Germany</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="France">France</option>
        <option value="Italy">Italy</option>
    </optgroup>
    <optgroup label="North America">
        <option value="United States">United States</option>
        <option value="Canada">Canada</option>
        <option value="Mexico">Mexico</option>
        <option value="Costa Rica">Costa Rica</option>
    </optgroup>
   
</select>
        
      </div>
      <div className="input-groupp">
        <label>Phone Number</label>
        <input type="tel" placeholder="(123) 456-7890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div className="shipping-options">
        {/* <h3>Shipping Options</h3> */}
        <div className="radio-groupp">
          <input type="radio" id="standardShipping" name="shipping" value="Standard" checked={shippingOption === 'Standard'} onChange={(e) => setShippingOption(e.target.value)} />
          <label htmlFor="standardShipping">Standard Shipping</label><p className='pp'>3 to 7 business day</p>
          
          {/* <input type="radio" id="expressShipping" name="shipping" value="Express" checked={shippingOption === 'Express'} onChange={(e) => setShippingOption(e.target.value)} />
          <label htmlFor="expressShipping">Express Shipping</label> */}
          
        </div>
      </div>
    </center><br />
    <center><StripeContainer />

    <div className="checkout-buttonnn">
                {cartItems.length > 0 && (
                    <button onClick={handlePayment} className="pay-button">
                        Payer
                    </button>
                )}
            </div>

    
    </center>
    
    
    
    {/* <div className="checkout-button-container">
    
      {cartItems.length > 0 &&
        <Link to={`/checkout`} className="pay-button">
          Checkout
        </Link>
      }
    </div> */}
  </div>
</div>
                </div>
            </main>
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

export default Cart;



