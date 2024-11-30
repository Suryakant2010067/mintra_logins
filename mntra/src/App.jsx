import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file for styling
import logo from "/logo_RM.png"; // Import the logo image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/login"; // Backend endpoint

    try {
      const response = await axios.post(url, { email, password });
      setMessage(response.data.message); // Display success message
      setIsSuccess(true);
      console.log("Login successful:", response.data); // Handle token or user data
    } catch (error) {
      setIsSuccess(false);
      if (error.response) {
        // API errors (e.g., invalid credentials)
        setMessage(error.response.data.message || "Login failed");
      } else {
        // Other errors
        setMessage("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
  <div className="login-card">
    {/* Left section for the logo */}
    <div className="login-logo-container">
      <img src="/logo_RM.png" alt="RecruitMantra Logo" className="login-logo" />
    </div>

    {/* Right section for the form */}
    <div className="login-form-container">
      <h1 className="login-title">RecruitMantra</h1>
      <p className="login-subtitle">Log-In</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">
          Continue
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
