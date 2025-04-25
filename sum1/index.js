import http from "http";
import querystring from "querystring";
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 50px;
      }

      h1 {
        color: #4caf50;
      }

      a {
        text-decoration: none;
        color: #2196f3;
        font-size: 18px;
      }

      a:hover {
        color: #0b7dda;
      }
    </style>
  </head>
  <body bgcolor="red">
    <h1>Welcome to Home Page</h1>
    <a href="/sum">Go to Calculation Page</a>
  </body>
</html>
`);
    res.end();
  } else if (req.url == "/sum") {
    res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 50px;
      }

      h1 {
        color: #4caf50;
      }

      a {
        text-decoration: none;
        color: #2196f3;
        font-size: 18px;
      }

      a:hover {
        color: #0b7dda;
      }

      form {
        margin-top: 20px;
      }

      label {
        font-size: 16px;
      }

      input {
        margin: 5px 0;
        padding: 8px;
        font-size: 14px;
      }

      button {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }

      button:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body bgcolor="green">
    <form action="/submit" method="POST">
      <label for="num1">Enter first number:</label>
      <input type="number" id="num1" name="num1" required />
      <br /><br />
      <label for="num2">Enter second number:</label>
      <input type="number" id="num2" name="num2" required />
      <br /><br />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`);
    res.end();
  } else if (req.url == "/submit" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { num1, num2 } = querystring.parse(body);
      const sum = parseFloat(num1) + parseFloat(num2);
      res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 50px;
      }

      h1 {
        color: #4caf50;
      }

      a {
        text-decoration: none;
        color: #2196f3;
        font-size: 18px;
      }

      a:hover {
        color: #0b7dda;
      }
    </style>
  </head>
  <body bgcolor="yellow">
    <h1>Result</h1>
    <p>The sum of ${num1} and ${num2} is ${sum} and ${1}</p>
    <a href="/">Go back to Home Page</a>
  </body>
</html>`);
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 Not Found</h1>");
    res.end();
  }
});
server.listen(3000);
