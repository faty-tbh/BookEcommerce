import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';
import './details.css';
import { useLocation } from 'react-router-dom';

function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const article = location.state.article;
    const [loading, setLoading] = useState(false);

    // Accessing product data passed from Home component via location.state

    useEffect(() => {
        console.log(article); // Log the received data to the console
    }, [article]);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Ensure quantity does not go below 1
    };

    const addToCart = async () => {
        setLoading(true);

        const item = {
            image: article.image,
            title: article.title,
            price: article.price,
            quantity: quantity,
            author:article.author,
            
            // Add other properties if needed
        };
        

        // Send item data to Flask server
        try {
            const response = await fetch('http://127.0.0.1:5000/get_info_panier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: item.title, author: item.author, price:item.price,image:item.image, quantity: item.quantity })
                
            });
            
            
            const data = await response.json();
            
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
        

        setLoading(false);
    };

    return (
        <div className="product-details">
            <Link to="/home">
                <FaArrowLeft className="back-arrow" /> {/* Add the back arrow icon */}
            </Link>
            

            {article.image.startsWith('data:image') || article.image.startsWith('http') ? (
                <img src={article.image} alt="" className="product-imagee" />
            ) : (
                <img src={`data:image/jpeg;base64,${article.image}`} alt={article.title} className="product-imagee" />
            )}
            <h2 className="product-price">{article.price} $</h2>
            <center><h1 className="product-title">{article.title}</h1></center>
            <center><p className="product-desc">{article.description}</p></center>
            <center><p className="product-lang"> {article.language} Language</p></center>
            {/* You can continue rendering other details of the article here */}
            <div className="quantity-selector">
                <button className="quantity-btn" onClick={decrementQuantity} disabled={quantity === 1}>
                    <FaMinus />
                </button>
                <input type="number" className="quantity-input" value={quantity} readOnly />
                <button className="quantity-btn" onClick={incrementQuantity}>
                    <FaPlus />
                </button>
            </div>
            <br />
            <div className="shipping-info">
                <FaShippingFast />
                <span>Shipping to Canada</span>
                {/* You can add more detailed shipping info here */}
            </div>
            <button className="add-to-cart-button" onClick={addToCart} disabled={loading}>
                {loading ? 'Adding to Cart...' : 'ADD TO CART'}
            </button>
        </div>
    );
}

export default ProductDetails;
