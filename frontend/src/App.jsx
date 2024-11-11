import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandinPage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignUp";
import DisclaimerPage from "../components/Disclaimer";
import DashboardPage from "../components/DashboardPage";
import Plinko from "../components/plinko/plinko1/pages/Plinko.jsx";
import './index.css'
import DoNotGamblePage from "../components/Donotgamblepage";
import AboutUs from "../components/Aboutus";
import TestComponent from "../components/test.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/donotgamble" element={<DoNotGamblePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/games/plinko" element={<Plinko />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/" element={<LandingPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;