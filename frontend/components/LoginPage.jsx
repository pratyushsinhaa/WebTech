import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      console.log("Login successful:", response.data);
      navigate("/dashboard"); // Redirect to Dashboard on successful login
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Error during login:", error.message);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="username"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "10px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")} style={{ background: "none", color: "blue", border: "none", cursor: "pointer" }}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;