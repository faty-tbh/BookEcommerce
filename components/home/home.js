import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser,FaHeart, FaShoppingCart, FaCamera, FaGlobe, FaHome, FaList } from 'react-icons/fa';
import axios from 'axios';
import './home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRatingDialog, setShowRatingDialog] = useState(false); // État pour afficher/masquer la boîte de dialogue
  const [selectedArticle, setSelectedArticle] = useState(null); // État pour stocker l'article sélectionné


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
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRatingDialogClose = () => {
    setShowRatingDialog(false);
  };
  const handleOpenRatingDialog = (article) => {
    setSelectedArticle(article);
    setShowRatingDialog(true);
  };

  const handleRatingSubmit = (rating) => {
    // Envoyer la note à votre API ou effectuer toute autre action nécessaire
    console.log(`Rating submitted for "${selectedArticle.title}": ${rating}`);
    axios.post('http://127.0.0.1:5000/rate_book', {
      rating: rating,
      title: selectedArticle.title
    })
    .then(response => {
      console.log(response.data); // Afficher la réponse de Flask dans la console
    })
    .catch(error => {
      console.error('Error sending rating to Flask:', error);
    });
    setShowRatingDialog(false);
    
  };
  


  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logoacc">BOOKS CAPITAL</div>
          <div className="search-icons-container">
            <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-button"><FaSearch /></button>
              <Link to="/camera" className="photo-search-button">
                <FaCamera />
              </Link>
            </div>
            <div className="icons-container">
              <Link to={`/user${window.location.search}`} className="iconn">
                <FaUser />
              </Link>
              <Link to={`/cart${window.location.search}`} className="iconn">
                <FaShoppingCart />
              </Link>


              <Link to="/recom" className="iconn">
                <FaHeart  />
              </Link>
              <Link to="/tracking" className="iconn">
                <FaGlobe  />
              </Link>
              
            </div>
          </div>
        </nav>
        <div className="promo-banner">
          <h2 className='upto'>Find Your book</h2>
        </div>
      </header>
      <main className="product-grid">
  {filteredArticles.length > 0 ? (
    filteredArticles.map((article, index) => (
      <div key={index} className={`product-cardd ${article.quantity === 0 ? 'out-of-stock' : ''}`}>
        <div className="product-image-containerr">
          {article.quantity === 0 && <div className="out-of-stock-label">OUT OF STOCK</div>}
          <Link to={article.quantity > 0 ? `/details/${index}` : '#'} state={{ article }}>
            <img src={`data:image/jpeg;base64,${article.image}`} alt={article.title} className="product-imago" />
          </Link>
        </div>
        <div className="product-infoo">
          <h3 className="product-titleee">{article.title}</h3>
          <h4 className="product-author">By : {article.author}</h4>
          {/* Affichage des étoiles */}
          <div className="rating-stars">
            {[...Array(5)].map((star, i) => (
              <span key={i} className="star" onClick={() => handleOpenRatingDialog(article)}>&#9734;</span>
            ))}
          </div>
          <h4 className="product-priceee">{article.price} $</h4>
          {article.quantity === 0 && <div className="out-of-stock-label">OUT OF STOCK</div>}
        </div>
        <button disabled={article.quantity === 0} className="add-to-cart-buttonn"><FaShoppingCart className="iconp" /></button>
      </div>
    ))
  ) : (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  )}
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

      {/* Boîte de dialogue pour l'évaluation */}
      {showRatingDialog && selectedArticle && (
        <div className="rating-dialog">
          <div className="rating-dialog-content">
            <h3>Rate "{selectedArticle.title}"</h3>
            <div className="rating-stars">
              {[...Array(5)].map((star, i) => (
                <span key={i} className="star" onClick={() => handleRatingSubmit(i + 1)}>&#9734;</span>
              ))}
            </div>
            <button onClick={handleRatingDialogClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default Home;
