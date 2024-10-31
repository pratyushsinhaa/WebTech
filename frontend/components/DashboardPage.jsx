import React, { useState } from "react";
import "./DashboardPage.css";
const DashboardPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const amount = 1000; // This should be fetched from user data (e.g., from context or props)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        <h1 className="amount">Amount: ₹{amount}</h1>
      </div>
      
      {isMenuOpen && (
        <div className="sidebar">
          <ul>
            <li>Games</li>
            <li>Wallet</li>
            <li>Why is Gambling Bad?</li>
            <li>About Us</li>
          </ul>
        </div>
      )}

      <div className="content">
        <h2>Welcome to the Gambling Dashboard!</h2>
        <p>Choose a game to start playing.</p>
        {/* You can add more content here like game buttons, etc. */}
      </div>
    </div>
  );
};

export default DashboardPage;