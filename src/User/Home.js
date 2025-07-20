// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Home.css';
// import logo from '../assets/logo.png';
// import img1 from '../assets/img1.png';

// const Home = () => {
//   const navigate = useNavigate();

//   const handleSkip = () => {
//     navigate('/Login');
//   };

//   return (
//     <div className="start-page1">
//       <img src={logo} alt="Tender Town Logo" className="logo" />

//       <p className="tagline1">
//         One app for Juice, Snacks, & food, <br />
//         more in minutes!
//       </p>

//       <div className="image-stack1">
//         <img src={img1} alt="Juice" className="stack-img center" />
//       </div>

//       <button className="skip-button" onClick={handleSkip}>Login</button>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png';

const Home = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/Login');
  //   }, 3000); // Redirect after 2.5 seconds

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="start-page1">
  <img src={logo} alt="Tender Town Logo" className="logo" />
</div>

    // <div className="start-page1">
    //   <img src={logo} alt="Tender Town Logo" className="logo" />
    // </div>
  );
};

export default Home;
