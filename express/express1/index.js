const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// Define a port
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Welcome page route
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Page</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f8ff;
        text-align: center;
      }
      header {
        background-color: #4caf50;
        color: white;
        padding: 20px;
      }
      h1 {
        margin: 0;
      }
      a {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      a:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Welcome to Our Website!</h1>
    </header>
    <p>
      We are glad to have you here. Click the button below to proceed to the
      form section.
    </p>
    <a href="/form">Go to Form Section</a>
  </body>
</html>`);
});

// Form page route
app.get("/form", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Page</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .form-container {
        background-color: #ffffff;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }
      h2 {
        text-align: center;
        color: #333;
      }
      label {
        display: block;
        margin-top: 15px;
        font-weight: bold;
        color: #555;
      }
      input,
      textarea,
      select {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
      }
      button {
        width: 100%;
        padding: 10px;
        margin-top: 20px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }
      button:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body>
    <div class="form-container">
      <h2>Fill Out the Form</h2>
      <form action="/submit" method="post">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />

        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <label for="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          placeholder="Enter your message"
          required
        ></textarea>

        <label for="gender">Gender:</label>
        <select id="gender" name="gender" required>
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  </body>
</html>`);
});

// Submit page route
app.post("/submit", (req, res) => {
  const { name, email, message, gender } = req.body;

  // Create a string with the submitted data
  const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nGender: ${gender}\n\n`;

  // Define the file path for submissions.txt
  const filePath = path.join(__dirname, "submissions.txt");

  // Append the data to the file
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      res.status(500).send("An error occurred while saving your data.");
    } else {
      res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Submission Successful</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f8ff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
      }
      .message-container {
        background-color: #ffffff;
        padding: 30px 40px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
      }
      h1 {
        color: #4caf50;
        margin-bottom: 20px;
      }
      p {
        color: #555;
        font-size: 16px;
        margin-bottom: 20px;
      }
      a {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      a:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="message-container">
      <h1>Thank You!</h1>
      <p>Your form has been successfully submitted.</p>
      <a href="/">Go Back to Home</a>
    </div>
  </body>
</html>`);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
