import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';
import logo from '../assets/logo.png';
import img1 from '../assets/img1.png';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/admin/login'); 
  };

  return (
    <div className="start-page">
      <img src={logo} alt="Tender Town Logo" className="logo" />

      <p className="tagline">
        One app for Juice, Snacks, & food, <br />
        manage it with ease!
      </p>

      <div className="image-stack single">
        <img src={img1} alt="Admin View" className="stack-img center" />
      </div>

      <button className="skip-button" onClick={handleSkip}>Skip</button>
    </div>
  );
};

export default AdminHome;
