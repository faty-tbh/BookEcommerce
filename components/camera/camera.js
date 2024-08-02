import React, {useState} from 'react';
import './camera.css';
import { Link } from 'react-router-dom'; 
import { FaHome, FaList, FaUpload } from 'react-icons/fa';

function Cam() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      if (file && file.type.startsWith('image/') && file.size <= 2097152) {
        // Assuming the upload is "successful"
        setUploadedImage(URL.createObjectURL(file));
        setUploadSuccess(true);
        // Here you would typically also upload the file to a server
      } else {
        // Handle the error case
        if (file.size > 2097152) {
          alert('Image size must be less than 2MB');
        } else {
          alert('Please upload a valid image file.');
        }
        setUploadSuccess(false);
      }
    };
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logoacc">Classic Capital</div>
        </nav>
        <div className="promo-banner">
          <h2 className='upto'>SEARCH WITH A PHOTO</h2>
        </div>
      </header>
      <main className="upload-container">
        <div className="image-uploader">
          <FaUpload className="upload-icon" />
          <p className="upload-text">Upload Image</p>
          <p className="upload-size-info">Image size must be less than 2MB</p>
          <label htmlFor="file-upload" className="custom-file-upload">
            Select Image
          </label>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
          {uploadSuccess && (
            <div className="upload-success">
              <p>Image uploaded successfully!</p>
              <img src={uploadedImage} alt="Uploaded" className="uploaded-image-preview" />
            </div>
          )}
        </div>
      </main>
      <footer className="footerr">
        
        <div className="footer-iconn">
            <Link to="/home" className='photoo'>
               <FaHome />
               
            </Link>   
          <span>Home</span>
        </div>
        <div className="footer-iconn">
          <FaList />
          <span>Category</span>
        </div>
      </footer>
    </div>
  );
}

export default Cam;