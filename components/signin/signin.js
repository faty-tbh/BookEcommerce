import React, { useState } from 'react';
import axios from 'axios';
import './signin.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', formData);
      console.log(response.data);

      // Créer une URL avec les données du formulaire et les données reçues de Flask
      const urlParams = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        urlParams.append(key, value);
      });
      Object.entries(response.data).forEach(([key, value]) => {
        urlParams.append(key, value);
      });
      const url = `/home?${urlParams.toString()}`;

      // Rediriger l'utilisateur vers la page d'accueil avec les données dans l'URL
      window.location.href = url;
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign In</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i >&#9993;</i>
            <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <i>&#128274;</i>
            <input type="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} />
          </div>
          <button className="create-account" type="submit">Sign In</button>
        </form>
        <p className="signin-link"><a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default SignIn;
