import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 🔁 Add this
import './OtpVerification.css';
import logo from '../assets/logo.png';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate(); // 🔁 Hook for redirecting

  // ⏱ Countdown Timer
  useEffect(() => {
    if (timer === 0) return;
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  // 🟡 Check if all 6 digits are filled
  const isOtpComplete = otp.every(d => d.trim() !== '');

  // 🔢 Handle OTP Change
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // 🟢 On Continue click
  const handleContinue = () => {
    const enteredOtp = otp.join('');
    console.log('OTP entered:', enteredOtp);
    navigate('/menu'); // 🔁 Redirect to menu page
  };

  return (
    <div className="otp-wrapper">
      <div className="top-section">
        <img src={logo} alt="Tender Town Logo" className="login-logo" />
        <p className="login-tagline">One app for Juice, Snacks, & food,<br />more in minutes!</p>
      </div>

      <div className="otp-card">
        <h2>Enter verification code</h2>
        <p className="otp-sent">Sent to +91 8256 256932</p>

        <div className="otp-inputs">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          ))}
        </div>

        <p className="resend-text">
          Get verification code again in{' '}
          <span className="resend-timer">{`00:${timer.toString().padStart(2, '0')}`}</span>
        </p>

        <button
          className="otp-button"
          onClick={handleContinue}
          disabled={!isOtpComplete}
          style={{
            opacity: isOtpComplete ? 1 : 0.6,
            cursor: isOtpComplete ? 'pointer' : 'not-allowed'
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;


// import React, { useState, useEffect } from 'react';
// import './OtpVerification.css';
// import logo from './assets/logo.png';

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);

//   // Countdown Timer
//   useEffect(() => {
//     if (timer === 0) return;
//     const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//     return () => clearTimeout(countdown);
//   }, [timer]);

//   // Handle OTP Change
//   const handleChange = (index, value) => {
//     if (!/^[0-9]?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next box
//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   return (
//     <div className="otp-wrapper">
//       <div className="top-section">
//         <img src={logo} alt="Tender Town Logo" className="login-logo" />
//         <p className="login-tagline">One app for Juice, Snacks, & food,<br />more in minutes!</p>
//       </div>

//       <div className="otp-card">
//         <h2>Enter verification code</h2>
//         <p className="otp-sent">Sent to +91 8256 256932</p>

//         <div className="otp-inputs">
//           {otp.map((digit, idx) => (
//             <input
//               key={idx}
//               id={`otp-${idx}`}
//               type="text"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(idx, e.target.value)}
//             />
//           ))}
//         </div>

//         <p className="resend-text">
//           Get verification code again in{' '}
//           <span className="resend-timer">{`00:${timer.toString().padStart(2, '0')}`}</span>
//         </p>

//         <button className="otp-button">Continue</button>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;
