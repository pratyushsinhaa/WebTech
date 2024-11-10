import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #f8fafc, #eff6ff)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "2rem",
      textAlign: "center",
    },
    image: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "2rem",
    },
    teamContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "2rem",
      flexWrap: "wrap",
    },
    memberCard: {
      backgroundColor: "white",
      borderRadius: "1rem",
      padding: "2rem",
      width: "250px",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    memberName: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem",
    },
    memberDescription: {
      color: "#475569",
      fontSize: "1rem",
      lineHeight: "1.5",
    },
    backButton: {
      marginTop: "2rem",
      backgroundColor: "#2563eb",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      border: "none",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
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
      <h1 style={styles.heading}>Meet the Team</h1>
      <img
        src="path_to_central_image.jpg"
        alt="Our Team"
        style={styles.image}
      />
      <div style={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            style={styles.memberCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h2 style={styles.memberName}>{member.name}</h2>
            <p style={styles.memberDescription}>{member.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.button
        style={styles.backButton}
        onClick={() => navigate("/dashboard")}
        whileHover={{ backgroundColor: "#1d4ed8", scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Dashboard
      </motion.button>
    </div>
  );
};

export default AboutUs;