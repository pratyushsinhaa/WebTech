import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc, #eff6ff)",
  },
  nav: {
    position: "fixed",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    zIndex: 10,
  },
  navContent: {
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1e293b",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  mainContent: {
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "6rem 1rem 0 1rem",
  },
  heroSection: {
    textAlign: "center",
    padding: "4rem 0",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: "1.5rem",
  },
  heroParagraph: {
    fontSize: "1.25rem",
    color: "#475569",
    maxWidth: "42rem",
    margin: "0 auto 2rem auto",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    padding: "4rem 0",
  },
  featureCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  featureTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "1rem",
  },
  featureText: {
    color: "#475569",
  },
  gamesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    padding: "4rem 0",
  },
  gameCard: {
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    cursor: "pointer",
    textAlign: "center",
  },
};

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h1 style={styles.logo}>Gambler's Dilemma</h1>
          <Link to="/login">
            <button style={styles.button}>Login</button>
          </Link>
        </div>
      </nav>

      <div style={styles.mainContent}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.heroSection}
        >
          <h2 style={styles.heroTitle}>Understanding the House Edge</h2>
          <p style={styles.heroParagraph}>
            Discover why gambling platforms always win in the long run through interactive demonstrations and real statistics.
          </p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              style={styles.button}
            >
              Start Learning Now
            </motion.button>
          </Link>
        </motion.div>

        <div style={styles.featureGrid}>
          {['Interactive Games', 'Real Statistics', 'Risk Education'].map((title, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              style={styles.featureCard}
            >
              <h3 style={styles.featureTitle}>{title}</h3>
              <p style={styles.featureText}>
                Learn how gambling platforms operate and why they always profit.
              </p>
            </motion.div>
          ))}
        </div>

        <div style={styles.gamesGrid}>
          {['Crash', 'Plinko', 'Mines', 'Wheel', 'Dice', 'Blackjack'].map((game) => (
            <motion.div
              key={game}
              whileHover={{ scale: 1.05 }}
              style={styles.gameCard}
            >
              <h3 style={styles.featureTitle}>{game}</h3>
              <p style={styles.featureText}>Learn the mechanics</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;