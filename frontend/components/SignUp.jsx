import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", formData);
      console.log("Signup successful:", response.data);
      // You can redirect the user or show a success message here
    } catch (error) {
      if (error.response) {
        console.error("Signup failed:", error.response.data.message);
      } else {
        console.error("Error during signup:", error.message);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign Up</h1>
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
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "10px" }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "10px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")} style={{ background: "none", color: "blue", border: "none", cursor: "pointer" }}>
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupPage;