import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Wallet from "../Wallet";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #f8fafc, #eff6ff)",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      backgroundColor: "white",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #e2e8f0",
    },
    menuButton: {
      fontSize: "1.5rem",
      background: "none",
      border: "none",
      cursor: "pointer",
      marginRight: "1rem",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1e293b",
      flexGrow: 1,
    },
    sidebar: {
      position: "fixed",
      top: "0",
      left: isMenuOpen ? "0" : "-250px",
      width: "250px",
      height: "100%",
      backgroundColor: "#fff",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      overflowY: "auto",
      transition: "left 0.3s ease",
      zIndex: 1000,
      paddingTop: "4rem",
    },
    sidebarItem: {
      padding: "1rem 2rem",
      fontSize: "1rem",
      color: "#475569",
      cursor: "pointer",
      borderBottom: "1px solid #e2e8f0",
    },
    content: {
      flexGrow: 1,
      padding: "2rem",
      marginTop: "4rem",
    },
    gameCard: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      textAlign: "center",
      cursor: "pointer",
    },
    gameTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem",
    },
    gameDescription: {
      color: "#475569",
    },
    gamesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1.5rem",
      marginTop: "2rem",
    },
  };

  const menuItems = [
    { name: "Games", action: () => navigate("/games") },
    { name: "Wallet", action: () => navigate("/wallet") },
    { name: "Why is Gambling Bad?", action: () => navigate("/donotgamble") },
    { name: "About Us", action: () => navigate("/aboutus") },
    { name: "Logout", action: () => navigate("/login") },
  ];

  const games = ["Crash", "Plinko", "Mines", "Wheel", "Dice", "Blackjack"];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={toggleMenu} style={styles.menuButton}>
          &#9776;
        </button>
        <h1 style={styles.title}>Dashboard</h1>
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
        <h2 style={{ ...styles.gameTitle }}>Welcome!</h2>
        <p style={styles.gameDescription}>
          Choose a game to start playing and learn why the house always wins.
        </p>
        <div style={styles.gamesGrid}>
          {games.map((game, index) => (
            <motion.div
              key={index}
              style={styles.gameCard}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/games/${game.toLowerCase()}`)}
            >
              <h3 style={styles.gameTitle}>{game}</h3>
              <p style={styles.gameDescription}>Play and learn the odds</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;