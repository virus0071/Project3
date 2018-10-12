
var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/login.html"))
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/home.html"))
  });

  app.get("/week", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/week.html"))
  });

  app.get("/month", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/month.html"))
  });

  app.get("/plan", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/budget.html"))
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("<h1>404</h1>");
  });
};