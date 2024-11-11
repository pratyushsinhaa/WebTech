import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignUp";
import DashboardPage from "../components/DashboardPage";
import BlackjackGame from "../components/BlackjackGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/blackjack" element={<BlackjackGame />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;