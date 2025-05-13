// LogoutButton.jsx
import React from 'react';
import './Home.css';

const LogoutButton = ({ onReset }) => {
  return (
    <div className="reset-container">
      <button
            onClick={handleLogout}
            type="submit"
            className="btn btn-logout"
          >
            Logout
        </button>
    </div>
  );
};

export default LogoutButton;