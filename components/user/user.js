import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    telephone: '',
    password: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataFromURL = {};
    for (let [key, value] of params) {
      dataFromURL[key] = value;
    }
    setUserData(dataFromURL);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Fonction pour soumettre les données d'utilisateur éditées à Flask
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer les données éditées à l'API Flask
      const response = await axios.post('http://127.0.0.1:5000/edit_user', userData);
      console.log(response.data);
      window.location.href = "/home"
      // Mettez ici votre logique pour traiter la réponse si nécessaire
    } catch (error) {
      console.error('Erreur lors de la modification des données:', error);
    }
  };

  return (
    <div>
      <h2>User Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <i>&#128100;</i>
          <input type="text" name="name" placeholder="Name" value={userData.name || ''} onChange={handleChange} />
        </div>
        <div className="input-group">
          <i>&#9993;</i>
          <input type="email" name="email" placeholder="E-mail" value={userData.email || ''} onChange={handleChange} />
        </div>
        <div className="input-group">
          <i>&#127968;</i>
          <input type="text" name="address" placeholder="111 rue du souvenir, laval, Qc" value={userData.address || ''} onChange={handleChange} />
        </div>
        <div className="input-group">
          <i>&#128222;</i>
          <input type="text" name="telephone" placeholder="000 000 0000" value={userData.telephone || ''} onChange={handleChange} />
        </div>
        <div className="input-group">
          <i>&#128274;</i>
          <input type="password" name="password" placeholder="********" value={userData.password || ''} onChange={handleChange} />
        </div>
        
        <button className="create-account" type="submit">Edit</button>
      </form>
    </div>
  );
}

export default User;
