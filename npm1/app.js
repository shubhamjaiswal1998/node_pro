const http = require("http");
const { sum1 } = require("./exported1");
const server = http.createServer((req, res) => {
  sum1();
  res.write("server created at by main page");
  res.end();
});
server.listen(3000, () => {
  console.log("at 3000");
});
