import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; 
import logo from '../assets/logo.png';
import eyeIcon from '../assets/eye-icon.png';
import eyeOpenIcon from '../assets/eye-open.png';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isFormValid = adminId.trim() !== '' && password.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid) {
      navigate('/admin/dashboard'); 
    }
  };

  return (
    <div className="login-wrapper">
      <div className="top-section">
        <img src={logo} alt="Tender Town Logo" className="login-logo" />
        <p className="login-tagline">
          Admin Login
        </p>
      </div>

      <div className="login-card">
        {/* <h2>Admin Login</h2> */}

        <div className="input-wrapper">
          <label>Admin ID<span className="required">*</span></label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
        </div>

        <div className="input-wrapper password-wrapper">
          <label>Password<span className="required">*</span></label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? eyeOpenIcon : eyeIcon}
            alt="Toggle visibility"
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button
          className="login-button"
          disabled={!isFormValid}
          onClick={handleSubmit}
          style={{
            opacity: isFormValid ? 1 : 0.6,
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
