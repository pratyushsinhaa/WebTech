import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(null);
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
    signupPrompt: {
      textAlign: "center",
      marginTop: "1.5rem",
      color: "#475569",
      fontSize: "0.875rem",
    },
    signupLink: {
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

  const fetchWalletBalance = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
      setError("Failed to retrieve wallet balance");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      const token = response.data.token;

      // Store the token in localStorage with the correct key 'authToken'
      localStorage.setItem("authToken", token);

      // Fetch and set the wallet balance
      await fetchWalletBalance(token);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchWalletBalance(token);
    }
  }, []);

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.formCard}
      >
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Log in to Gambler's Dilemma</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: error ? "#dc2626" : "#e2e8f0",
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
                borderColor: error ? "#dc2626" : "#e2e8f0",
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
            {isLoading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        <div style={styles.signupPrompt}>
          Don't have an account?
          <Link to="/signup" style={styles.signupLink}>
            Sign up here
          </Link>
        </div>

        {balance !== null && (
          <div style={{ textAlign: "center", marginTop: "1.5rem", color: "#1e293b", fontSize: "1.25rem" }}>
            Your wallet balance: ₹{balance}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;