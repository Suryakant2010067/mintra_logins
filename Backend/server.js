const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const apiURL = "http://15.206.133.74/user/login";

  try {
    // Send POST request to the provided API
    const apiResponse = await axios.post(apiURL, { email, password });

    // Send API response back to the frontend
    res.status(200).json({
      message: "Login successful",
      data: apiResponse.data, // Assuming the API returns user data or token
    });
  } catch (error) {
    // Handle API errors
    if (error.response) {
      // If the error is from the API
      res
        .status(error.response.status)
        .json({ message: error.response.data.message || "Login failed" });
    } else {
      // For other errors
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
