import React, { useState } from "react";
import crashImg from './images/crash.jpg';
import plinkoImg from './images/plinko.jpg';
import diceImg from './images/dice.png';
import blackjackImg from './images/blackjack.jpg';
import crapsImg from './images/craps.png';
import minesImg from './images/mines.jpg';
import { m, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Wallet from "../Wallet";
import '@fontsource/quicksand';
import '@fontsource/comfortaa';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #A4D7E1, #FFFFFF)",
      fontFamily: 'Quicksand, sans-serif',
    },
    header: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(8px)",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #e2e8f0",
      position: "fixed",
      width: "100%",
      zIndex: 10,
    },
    menuButton: {
      fontSize: "1.5rem",
      background: "none",
      color: "#004D4D",
      border: "none",
      cursor: "pointer",
      marginRight: "1rem",
      fontFamily: 'Quicksand, sans-serif',
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#004D4D",
      flexGrow: 1,
      fontFamily: 'Comfortaa, cursive',
    },
    sidebar: {
      position: "fixed",
      top: "0",
      left: isMenuOpen ? "0" : "-250px",
      width: "250px",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(8px)",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      overflowY: "auto",
      transition: "left 0.3s ease",
      zIndex: 1000,
      paddingTop: "4rem",
      fontFamily: 'Quicksand, sans-serif',
    },
    sidebarItem: {
      padding: "1rem 2rem",
      fontSize: "1rem",
      color: "#004D4D",
      cursor: "pointer",
      borderBottom: "1px solid #e2e8f0",
      transition: "background-color 0.2s",
      fontFamily: 'Quicksand, sans-serif',
    },
    content: {
      maxWidth: "1152px",
      margin: "0 auto",
      padding: "8rem 2rem 2rem",
      width: "100%",
    },
    welcomeSection: {
      textAlign: "center",
      marginBottom: "4rem",
    },
    welcomeTitle: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#004D4D",
      marginBottom: "1.5rem",
      fontFamily: 'Comfortaa, cursive',
    },
    gameCard: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      textAlign: "center",
      cursor: "pointer",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      fontFamily: 'Quicksand, sans-serif',
    },
    gameTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#004D4D",
      marginBottom: "0.5rem",
      fontFamily: 'Comfortaa, cursive',
    },
    gameDescription: {
      color: "#475569",
      fontFamily: 'Quicksand, sans-serif',
      lineHeight: "1.6",
    },
    gamesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
    }
  };

  const menuItems = [
    { name: "Games", action: () => navigate("/dashboard") },
    { name: "Wallet", action: () => navigate("/wallet") },
    { name: "Why is Gambling Bad?", action: () => navigate("/nogamble") },
    { name: "About Us", action: () => navigate("/aboutus") },
    { name: "Logout", action: () => navigate("/login") },
  ];

  const games = [
    {
      name: "Crash",
      image: crashImg,
      description: "Test your nerves in this thrilling multiplier game"
    },
    {
      name: "Plinko",
      image: plinkoImg,
      description: "Watch the ball fall through a maze of pegs"
    },
    {
      name: "Craps",
      image: crapsImg,
      description: "Classic dice game with multiple betting options"
    },
    {
      name: "Mines",
      image: minesImg, 
      description: "Navigate through a minefield of multipliers"
    },
    
    {
      name: "Dice",
      image: diceImg,
      description: "Simple yet engaging dice rolling game"
    },
    {
      name: "Blackjack",
      image: blackjackImg,
      description: "Classic card game against the dealer"
    }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={toggleMenu} style={styles.menuButton}>
          &#9776;
        </button>
        <h1 style={styles.title}>Gambler's Dilemma</h1>
        <Wallet />
      </header>

      {isMenuOpen && (
        <motion.div
          style={styles.sidebar}
          initial={{ left: "-250px" }}
          animate={{ left: isMenuOpen ? "0" : "-250px" }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={styles.sidebarItem}
              onClick={() => {
                item.action();
                setIsMenuOpen(false);
              }}
            >
              {item.name}
            </div>
          ))}
        </motion.div>
      )}

      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.welcomeSection}
        >
          <h2 style={styles.welcomeTitle}>Welcome to the Games</h2>
          <p style={styles.gameDescription}>
            Choose a game to start playing and learn why the house always wins through interactive demonstrations.
          </p>
        </motion.div>

        <div style={styles.gamesGrid}>
          {games.map((game, index) => (
            <motion.div
              key={index}
              style={styles.gameCard}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 6px 8px rgba(0,0,0,0.2)"
              }}
              onClick={() => navigate(`/games/${game.name.toLowerCase()}`)}
            >
              <img
                src={game.image}
                alt={game.name}
                style={styles.gameImage}
              />
              <h3 style={styles.gameTitle}>{game.name}</h3>
              <p style={styles.gameDescription}>{game.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;