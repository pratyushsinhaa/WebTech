import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DoNotGamblePage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #f8fafc, #eff6ff)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "1rem",
      padding: "2.5rem",
      width: "100%",
      maxWidth: "800px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "1.5rem",
      color: "#475569",
      marginBottom: "2rem",
      textAlign: "center",
    },
    section: {
      marginBottom: "2rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "1rem",
    },
    content: {
      color: "#475569",
      lineHeight: "1.8",
      fontSize: "1rem",
      marginBottom: "1rem",
    },
    highlight: {
      backgroundColor: "#dbeafe",
      padding: "1.5rem",
      borderRadius: "0.5rem",
      marginBottom: "1.5rem",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "0.875rem 2rem",
      borderRadius: "0.5rem",
      border: "none",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
      display: "block",
      margin: "2rem auto 0",
    },
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <h1 style={styles.title}>Why You Shouldn't Gamble</h1>
        <h2 style={styles.subtitle}>Understanding the Mathematical Reality</h2>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>The House Always Wins</h3>
          <p style={styles.content}>
            Every casino game is mathematically designed to ensure the house has an advantage. 
            This means that over time, the casino will always profit, while players will inevitably lose money.
          </p>
        </div>

        <div style={styles.highlight}>
          <h3 style={styles.sectionTitle}>Key Facts:</h3>
          <ul style={{ ...styles.content, marginLeft: "1.5rem" }}>
            <li>Slot machines typically have a house edge of 2-15%</li>
            <li>Roulette has a house edge of 5.26% (American) or 2.7% (European)</li>
            <li>Even Blackjack, with perfect strategy, has a house edge of about 0.5%</li>
            <li>Online crash games are programmed to ensure house profit</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>The Gambler's Fallacy</h3>
          <p style={styles.content}>
            Many believe that after a series of losses, a win is "due." This is false. Each bet is 
            independent, and previous outcomes don't influence future results. The house edge remains 
            constant regardless of past results.
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Long-Term Mathematics</h3>
          <p style={styles.content}>
            With a 5% house edge, betting $100: <br />
            - After 100 bets: Expected loss = $500 <br />
            - After 1000 bets: Expected loss = $5000 <br />
            The more you play, the more certain you are to lose.
          </p>
        </div>

        <div style={styles.highlight}>
          <h3 style={styles.sectionTitle}>Remember:</h3>
          <p style={styles.content}>
            Gambling establishments are businesses, not entertainment centers. Their profit comes 
            from players' losses. No strategy can overcome the mathematical advantage built into 
            their games.
          </p>
        </div>

        <motion.button
          onClick={() => navigate("/login")}
          style={styles.button}
          whileHover={{ backgroundColor: "#1d4ed8", scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to Learn More
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DoNotGamblePage;