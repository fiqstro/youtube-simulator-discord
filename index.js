const Client = require("./base/YouTubeSimulator");
const client = new Client({
  fetchAllMembers: true,
  disableEveryone: true
});

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.shuffle = function() {
  var currentIndex = this.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }
  return this;
};

client.login(client.config.token);

process.on('unhandledRejection', (reason, promise) => {
  console.error(`[ERROR] ${reason}`)
});

process.on('warning', (warning) => {
  console.warn(`[WARNING] ${warning}`)   
});

const http = require('http');
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(Math.floor(Math.random() * 9000) + 1000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 100000);