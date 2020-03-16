const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const client = require("./index");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("node_modules"));
app.use(express.static("styles"));
app.use(express.static("scripts"));
app.use(
  require("express-session")({
    secret: "sexyFiqstro",
    resave: false,
    saveUninitialized: false,
    expires: 604800000
  })
);
app.use("/", require("./routes/general"));

server.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
