const app = require("express").Router();
const client = require("../index");

app.get("/", async (req, res) => {
  res.render("index", {
    bot: client,
    user: req.session.user || null
  });
});

module.exports = app;
