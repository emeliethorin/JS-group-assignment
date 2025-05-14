// ResetButton.jsx
import React from 'react';
import './ResetButton.css';

const ResetButton = ({ onReset }) => {
  return (
    <div className="reset-container">
      <button className="reset-btn" onClick={onReset}>
        Try again!
      </button>
    </div>
  );
};

export default ResetButton;

