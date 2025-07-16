// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import './Login.css';
// import logo from '../assets/logo.png';
// import eyeIcon from '../assets/eye-icon.png';
// import eyeOpenIcon from '../assets/eye-open.png';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [mobile, setMobile] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); 

//   const isFormValid = (
//     mobile.trim().length === 10 && 
//     username.trim() !== '' &&
//     password.trim() !== ''
//   );

//   const handleSubmit = () => {
//     if (isFormValid) {
//       navigate('/otp'); 
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="top-section">
//         <img src={logo} alt="Tender Town Logo" className="login-logo" />
//         <p className="login-tagline">
//           One app for Juice, Snacks, & food,<br />more in minutes!
//         </p>
//       </div>

//       <div className="login-card">
//         <h2>Enter your number</h2>

//         <div className="input-wrapper">
//           <label>Mobile No.<span className="required">*</span></label>
//           <input
//             type="text"
//             maxLength="10"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value.replace(/\D/, ''))}
//           />
//         </div>

//         <div className="input-wrapper">
//           <label>User Name<span className="required">*</span></label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         <div className="input-wrapper password-wrapper">
//   <label>Password<span className="required">*</span></label>
//   <input
//     type={showPassword ? 'text' : 'password'}
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
//   <span
//     className="material-symbols-rounded eye-icon"
//     style={{ color: '#1C1B1F', cursor: 'pointer' }}
//     onClick={() => setShowPassword(!showPassword)}
//   >
//     {showPassword ? 'visibility' : 'visibility_lock'}
//   </span>
// </div>


//         <button
//           className="login-button"
//           disabled={!isFormValid}
//           onClick={handleSubmit}
//           style={{
//             opacity: isFormValid ? 1 : 0.6,
//             cursor: isFormValid ? 'pointer' : 'not-allowed'
//           }}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/logo.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isFormValid =
    mobile.trim().length === 10 &&
    username.trim() !== '' &&
    password.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid) {
      navigate('/otp');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="top-section">
        <img src={logo} alt="Tender Town Logo" className="login-logo" />
        <p className="login-tagline">
          One app for Juice, Snacks, & food,<br />
          more in minutes!
        </p>
      </div>

      <div className="login-scrollable">
        <div className="login-card">
          <h2>Enter your Details</h2>

          <div className="input-wrapper">
            <label>
              Mobile No.<span className="required">*</span>
            </label>
            <input
              type="text"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          <div className="input-wrapper">
            <label>
              Name<span className="required">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-wrapper password-wrapper">
            <label>
              Password<span className="required">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="material-symbols-rounded eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'visibility' : 'visibility_off'}
            </span>
          </div>

          {/* Moved Continue button inside card */}
          <div className="card-bottom-spacing">
            <button
              className="login-button"
              disabled={!isFormValid}
              onClick={handleSubmit}
              style={{
                backgroundColor: isFormValid ? '#3E7701' : '#fdb940',
                color: isFormValid ? '#fff' : '#3E7701',
                opacity: 1,
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
