import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdOutlineTaskAlt } from "react-icons/md";
import './Feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    alert(`Rating: ${rating}\nMessage: ${message}`);
    // You can send data to backend here
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <div className="feedback-icon">
  <MdOutlineTaskAlt size={36} color="#2f9e44" />
</div>

        {/* <div className="feedback-icon">✅</div> */}
        <h2 className="feedback-title">Feedback</h2>

        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                size={28}
                className="star"
                color={
                  currentRating <= (hover || rating) ? '#f9b000' : '#ccc'
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(currentRating)}
              />
            );
          })}
        </div>

        <label className="feedback-label">Feedback</label>
        <textarea
          className="feedback-textarea"
          placeholder="enter here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="feedback-button" onClick={handleSubmit}>
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
