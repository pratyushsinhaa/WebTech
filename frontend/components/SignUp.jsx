import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    formCard: {
      backgroundColor: "white",
      borderRadius: "1rem",
      padding: "2.5rem",
      width: "100%",
      maxWidth: "450px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#64748b",
      marginBottom: "2rem",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      fontSize: "0.875rem",
      color: "#475569",
      fontWeight: "500",
    },
    input: {
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "1px solid #e2e8f0",
      fontSize: "1rem",
      transition: "all 0.2s",
      outline: "none",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      padding: "0.875rem",
      borderRadius: "0.5rem",
      border: "none",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginTop: "0.5rem",
    },
    error: {
      color: "#dc2626",
      fontSize: "0.875rem",
      textAlign: "center",
      marginTop: "0.5rem",
    },
    loginPrompt: {
      textAlign: "center",
      marginTop: "1.5rem",
      color: "#475569",
      fontSize: "0.875rem",
    },
    loginLink: {
      color: "#2563eb",
      textDecoration: "none",
      marginLeft: "0.5rem",
      fontWeight: "500",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.firstName || !formData.lastName) {
      setError("All fields are required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/signup", formData);
      console.log("Signup successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "An error occurred during signup. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.formCard}
      >
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join Gambler's Dilemma to learn about gambling risks</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: error && !formData.firstName ? "#dc2626" : "#e2e8f0",
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: error && !formData.lastName ? "#dc2626" : "#e2e8f0",
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: error && !formData.username ? "#dc2626" : "#e2e8f0",
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: error && !formData.password ? "#dc2626" : "#e2e8f0",
              }}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ backgroundColor: "#1d4ed8" }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        <div style={styles.loginPrompt}>
          Already have an account?
          <Link to="/login" style={styles.loginLink}>
            Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;