import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png';
import img1 from '../assets/img1.png';

const Home = () => {
  const navigate = useNavigate(); 

  const handleSkip = () => {
    navigate('/Login'); 
  };

  return (
    <div className="start-page">
      <img src={logo} alt="Tender Town Logo" className="logo" />

      <p className="tagline">
        One app for Juice, Snacks, & food, <br />
        more in minutes!
      </p>

      <div className="image-stack single">
        <img src={img1} alt="Juice" className="stack-img center" />
      </div>

      <button className="skip-button" onClick={handleSkip}>Skip</button>
    </div>
  );
};

export default Home;

