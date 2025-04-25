const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
<title>Document</title>
</head>
<body bgcolor="red">
  <h1>Welcome to the home page</h1>
  <a href="/sum">Calculate sum</a>
</body>
</html>`);
    res.end();
  } else if (req.url === "/sum") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
<title>Document</title>
</head>
<body bgcolor="red">
  <form action="/submit" method="post">
  <label for="num1">Enter first number </label>
  <input type="text" id="num1" name="num1" placeholder="Enter 1st number"><br>
  <label for="num2">Enter second number </label>
  <input type="text" id="num2" name="num2" placeholder="Enter 2nd number"><br>
  <input type="submit" value="Submit">
  </form>
</body>
</html>`);
    res.end();
  } else if (req.url === "/submit" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const params = new URLSearchParams(body);
      const num1 = parseFloat(params.get("num1"));
      const num2 = parseFloat(params.get("num2"));
      const sum = num1 + num2;

      res.setHeader("Content-Type", "text/html");
      res.write(`<!DOCTYPE html>
<html lang="en">
<head>
<title>Result</title>
</head>
<body bgcolor="red">
  <h1>The sum is: ${sum}</h1>
  <a href="/">Go back to home</a>
</body>
</html>`);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>404 Not Found</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
