const express = require("express");
const app = express();
app.use((req, res, next) => {
  console.log("first middleware", req.url, req.method);
  next();
});
app.use((req, res, next) => {
  console.log("second middleware", req.url, req.method);
  next();
});
app.get("/", (req, res, next) => {
  console.log("handle get/", req.url, req.method);
  res.send(`<h1>home page</h1>`);
});
app.get("/contact-details", (req, res, next) => {
  console.log("handle get /contact-details", req.url, req.method);
  res.send(`<h1>fill your details</h1>
    <form action="/contact-details" method="post">
      <input type="text" name="name" placeholder="enter name" />
      <input type="email" name="email" placeholder="enter email" />
      <input type="submit" />
    </form>`);
});
app.post("/contact-details", (req, res, next) => {
  console.log("handle conatct-details for post", req.url, req.method);
  res.send(`<h1>welcome we will contact you shortly</h1>`);
});
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
