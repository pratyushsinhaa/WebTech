import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import aboutusImg from "./images/aboutus.jpg";
import '@fontsource/quicksand';
import '@fontsource/comfortaa';

const AboutUs = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #A4D7E1, #FFFFFF)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "6rem 2rem 2rem",
      fontFamily: 'Quicksand, sans-serif',
    },
    header: {
      textAlign: "center",
      marginBottom: "4rem",
    },
    heading: {
      fontSize: "3.5rem",
      fontWeight: "700",
      color: "#004D4D",
      marginBottom: "1.5rem",
      fontFamily: 'Comfortaa, cursive',
    },
    subheading: {
      fontSize: "1.25rem",
      color: "#475569",
      maxWidth: "42rem",
      margin: "0 auto",
    },
    imageContainer: {
      position: "relative",
      width: "300px",
      height: "300px",
      marginBottom: "4rem",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #A4D7E1",
      boxShadow: "0 8px 16px rgba(164, 215, 225, 0.3)",
      transition: "transform 0.3s ease",
    },
    teamContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      width: "100%",
      maxWidth: "1152px",
      margin: "0 auto",
      padding: "2rem",
    },
    memberCard: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(8px)",
      borderRadius: "1rem",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(164, 215, 225, 0.3)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    memberName: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#004D4D",
      marginBottom: "1rem",
      fontFamily: 'Comfortaa, cursive',
    },
    memberDescription: {
      color: "#475569",
      fontSize: "1.1rem",
      lineHeight: "1.6",
      fontFamily: 'Quicksand, sans-serif',
    },
    backButton: {
      marginTop: "3rem",
      backgroundColor: "#004D4D",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: "0.75rem",
      border: "none",
      fontSize: "1.1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontFamily: 'Quicksand, sans-serif',
    },
  };

  const teamMembers = [
    {
      name: "Pratyush Sinha",
      description: "Goated. Is currently running Windows 95 on a Mac.",
    },
    {
      name: "Prakhar Kumar",
      description: "Trying to learn Rust so he can make more money.",
    },
    {
      name: "Preetham R Sanji",
      description: "Figuring out how to react to React.",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <motion.h1 
          style={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet the Team
        </motion.h1>
        <motion.p 
          style={styles.subheading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Wanted to build Stake, ended up building Anti Stake.
        </motion.p>
      </div>

      <motion.div 
        style={styles.imageContainer}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={aboutusImg}
          alt="Our Team"
          style={styles.image}
        />
      </motion.div>

      <div style={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            style={styles.memberCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ 
              transform: "translateY(-10px)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)"
            }}
          >
            <h2 style={styles.memberName}>{member.name}</h2>
            <p style={styles.memberDescription}>{member.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        style={styles.backButton}
        onClick={() => navigate("/dashboard")}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "#003333"
        }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Dashboard
      </motion.button>
    </div>
  );
};

export default AboutUs;