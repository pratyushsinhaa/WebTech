import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DisclaimerPage = () => {
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
      fontSize: "2rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    content: {
      color: "#475569",
      lineHeight: "1.8",
      marginBottom: "2rem",
      fontSize: "1.125rem",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "2rem",
    },
    acceptButton: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "0.875rem 2rem",
      borderRadius: "0.5rem",
      border: "none",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    rejectButton: {
      backgroundColor: "#dc2626",
      color: "white",
      padding: "0.875rem 2rem",
      borderRadius: "0.5rem",
      border: "none",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
  };

  const handleAccept = () => {
    navigate("/donotgamble");
  };

  const handleReject = () => {
    window.location.href = "https://www.ncpgambling.org/";
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <h1 style={styles.title}>DISCLAIMER</h1>
        
        <div style={styles.content}>
          <p>
            The information and content presented on this website are for educational purposes only. 
            We aim to demonstrate the risks and mathematical certainty behind gambling, highlighting 
            that the house always has an advantage. The games and simulations offered here are designed 
            to show how gambling can lead to financial loss, and they are not intended to promote or 
            encourage real-money gambling.
          </p>
          <br />
          <p><strong>By using this website, you understand that:</strong></p>
          <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>All games and examples shown are for demonstration purposes only and do not involve any real-money gambling.</li>
            <li>The outcomes of the games are based on typical gambling mechanics, designed to illustrate the inevitability of the house winning in the long term.</li>
            <li>We are not responsible for any decisions you make regarding gambling or any losses you may incur in real-world gambling situations.</li>
            <li>We do not offer any gambling services, nor do we provide advice or recommendations related to gambling.</li>
          </ul>
          <br />
          <p>
            If you or someone you know is struggling with a gambling addiction, we strongly encourage 
            you to seek help from professional resources such as ncpgambling.org.
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <motion.button
            onClick={handleAccept}
            style={styles.acceptButton}
            whileHover={{ backgroundColor: "#1d4ed8", scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            I Accept
          </motion.button>
          <motion.button
            onClick={handleReject}
            style={styles.rejectButton}
            whileHover={{ backgroundColor: "#b91c1c", scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            I Reject
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DisclaimerPage;