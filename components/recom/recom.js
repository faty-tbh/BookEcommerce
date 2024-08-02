import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaCamera, FaGlobe, FaHome, FaList } from 'react-icons/fa';
import './recom.css'

function Recom() {
    const [recommendations, setRecommendations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRatingDialog, setShowRatingDialog] = useState(false); // État pour afficher/masquer la boîte de dialogue
  const [selectedArticle, setSelectedArticle] = useState(null); // État pour stocker l'article sélectionné



    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/get_recommendations');
                const transformedData = response.data.map(recommendation => ({
                    title: recommendation.BookTitle,
                    author: recommendation.BookAuthor,
                    image: recommendation.ImageURLM,
                    price: 15.99, // Prix fixe
                    language: 'English', // Langue fixe
                    // Ajoutez d'autres transformations si nécessaire
                }));
                setRecommendations(transformedData);
                console.log(transformedData);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, []);

    const handleArticleClick = (article) => {
        console.log('Selected article:', article.title);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredArticles = recommendations.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="promo-bannerr">
          <h2 className='upto'>Recommended : Most Rated Books</h2>
        </div>
      </header>
      
      

      <main className="product-grid">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                        <div key={index} className="product-cardd" onClick={() => handleArticleClick(article)}>
                            
                                <div className="product-image-containerr">
                                <Link to={`/details/${index}`} state={{ article }}>
                                    <img src={article.image} alt="" className="product-imago" />
                                </Link>
                                </div>
                                <div className="product-infoo">
                                    <h3 className="product-titleee">{article.title}</h3>
                                    <h4 className="product-author">By: {article.author}</h4>
                                    <h4 className="product-priceee">{article.price} $</h4>
                                    {/* Affichage des étoiles */}
          <div className="rating-stars">
          {[...Array(5)].map((star, i) => (
  <span key={i} className="star" onClick={() => handleOpenRatingDialog(article)}>&#9734;</span>
))}
          </div>
                                </div>

                            <button className="add-to-cart-buttonn"><FaShoppingCart className="iconp" /></button>
                        </div>
                    ))
                ) : (
                    <strong>
                        <p>Loading...</p>
                    </strong>
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
            
   
export default Recom;
