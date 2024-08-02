import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaUser, FaShoppingCart, FaGlobe, FaHome, FaList } from 'react-icons/fa';
import './category.css';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setBooks([]);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/get_books_by_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); // Ajoutons un console.log ici pour vérifier les données
      setBooks(data);
    } catch (error) {
      console.error("Could not fetch the books:", error);
    }
  };


  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logoacc">BOOKS CAPITAL</div>
          <div className="search-icons-container">
            <div className="search-container">
            
            </div>
            <div className="icons-container">
              <Link to={`/user${window.location.search}`} className="iconn">
                <FaUser />
              </Link>
              <Link to={`/cart${window.location.search}`} className="iconn">
                <FaShoppingCart />
              </Link>
              {/* <FaHeart className="iconn" /> */}
              <Link to="/tracking" className="iconn">
                <FaGlobe  />
              </Link>
              
            </div>
          </div>
        </nav>
        
      </header>
      <div className="app">
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul className="category-list">
            {['Romance','Self-help', 'Action', 'Mystery', 'Science Fiction', 'Classics'].map((category) => (
              <li key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <main className="main-content">
  <div className="books-container">
    {books.map((book, index) => (
      <div key={index} className="book-circle">
        <Link to={`/details/${index}`}
          state={{ article: {
            title: book.TITLE,
            author: book.AUTHOR,
            genre: book.GENRE,
            description: book.DESCRIPTION,
            price: book.PRICE,
            quantity: book.QUANTITY_AVAILABLE,
            publicationDate: book.PUBLICATION_DATE,
            pages: book.PAGES,
            language: book.LANGUAGE,
            image: book.IMAGE,
          }}}>
          <img src={`data:image/jpeg;base64,${book.IMAGE}`} alt={book.TITLE} className="book-image" />
          <div className="book-title">{book.TITLE}</div>
        </Link>
      </div>
    ))}
  </div>
</main>
      </div>
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

export default Category;