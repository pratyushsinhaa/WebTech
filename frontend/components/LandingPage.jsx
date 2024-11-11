import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Our Application</h1>
      <p>This is the landing page. Please sign up to get started.</p>
      <Link to="/signup">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;