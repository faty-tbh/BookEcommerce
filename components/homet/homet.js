import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaCamera, FaHeart, FaGlobe,  FaHome, FaList } from 'react-icons/fa';
import axios from 'axios';
import './home.css';

function Home(props) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_all_articles');
        const decodedArticles = response.data.map(article => ({
          ...article,
          image: atob(article.image)
        }));
        setArticles(decodedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);
  const handleArticleClick = (article) => {
    console.log('Selected article:', article.title);
    
    
  }

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
          <h2 className='upto'>UP TO 50% OFF</h2>
        </div>
      </header>
      <main className="product-grid">
        {articles.map((article, index) => (
          <div key={index} className="product-cardd" onClick={() => handleArticleClick(article)}>
            <Link to={`/details/${index}`} state={{ article }}>
              <div className="product-image-containerr">
                <img src={`data:image/jpeg;base64,${article.image}`} alt={article.title} className="product-imago" />
              </div>
              <div className="product-infoo">
                <h3 className="product-titleee">{article.title}</h3>
                
                <h4 className="product-author">By : {article.author}</h4>

                <h4 className="product-priceee">{article.price} $</h4>
                
              </div>
            </Link>
            <button className="add-to-cart-buttonn"><FaShoppingCart className="iconp" /></button>
          </div>
        ))}
      </main>
      <footer className="footerr">
        <div className="footer-iconn">
          <FaHome />
          <span>Home</span>
        </div>
        <div className="footer-iconn">
          
          <Link to="../category" className="icon">
              <FaList />
          </Link>
          <span>Category</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;