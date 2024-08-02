import React, { useState } from 'react';
import axios from 'axios';
import './signup.css'; // Assurez-vous de créer un fichier CSS correspondant pour styliser vos composants

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    telephone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/create_account', formData);
      console.log(response.data);
      // Si la création du compte réussit, redirigez l'utilisateur vers la page de connexion
      window.location.href = '/signin'; // Redirection vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i>&#128100;</i>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <i >&#9993;</i>
            <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <i>&#127968;</i>
            <input type="text" name="address" placeholder="111 rue du souvenir, laval, Qc" value={formData.address} onChange={handleChange} />
          </div>
          <div className="input-group">
            <i>&#128222;</i>
            <input type="text" name="telephone" placeholder="000 000 0000" value={formData.telephone} onChange={handleChange} />
          </div>
          <div className="input-group">
            <i>&#128274;</i>
            <input type="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} />
          </div>
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I read and agree to Terms & Conditions</label>
          </div>
          <button className="create-account" type="submit">CREATE ACCOUNT</button>
        </form>
        <p className="signin-link">Already have an account? <a href="/signin">Sign in</a></p>
      </div>
    </div>
  );
}

export default SignUp;
