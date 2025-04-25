const express = require("express");
const crypto = require("crypto"); // For generating a random token
const app = express();

// Middleware to generate a token
function generateToken(req, res, next) {
  // Generate a random token
  const token = crypto.randomBytes(16).toString("hex");

  // Check if the token is blank or undefined
  if (!token || token.trim() === "") {
    res.status(500).json({
      success: false,
      message: "Failed to generate token",
    });
  } else {
    req.token = token; // Attach the token to the request object
    console.log("Generated Token:", token);
    next(); // Proceed to the next middleware or route handler
  }
}

// Apply the middleware globally (for all routes)
app.use(generateToken);

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello!",
    token: req.token,
  });
});

app.get("/aman", (req, res) => {
  res.json({
    name: "shubham",
    number: 5000,
    token: req.token,
  });
});

app.get("/aman/:id", (req, res) => {
  res.json({
    route: `/aman/${req.params.id}`,
    token: req.token,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
