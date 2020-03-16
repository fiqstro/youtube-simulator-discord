const { Client, Collection } = require("discord.js")
const Enmap = require("enmap")


class YTSimClient extends Client {
  constructor(opts) {
    this.commands = new Enmap();
    this.prefix = "yt.";
    this.devices = new Enmap();
    this.cooldowns = new Collection();
    this.color = "RED";
    
    this.db = new Enmap({
      name: "database",
      fetchAll: false,
      autoFetch: true,
      ensureProps: true
    });
    
    this.db2 = require("quick.db");
    
    this.comments = require("./replies/comments");
    this.shop = new Enmap();
  }
  
  async init() {
    
  }
  
  addmoney(user, amount) {
    let newbalance = this.db.get(`yt_${user}`, "bal.wallet");
    newbalance += amount;
    this.db.set(`yt_${user}`, newbalance, "bal.wallet");
  }; 

  getTip(auto = false) {
    let tips = [
      "**Tip: If you want to get more subscribers, do `yt.upvote`! It will give you +5% subscribers. (100 Bonus)**",
      "**Tip: If you want to make someone lose subscribers, try and expose them by doing `yt.expose <user>`! But failing could make you lose subs!**",
      "**Tip: Poor? Tired of begging? No problem! You can rob someone by using `yt.rob <user>`, to get money! But failing could make you lose subs!**",
      "**Tip: You can start a drama with a user, by using `yt.drama`. and if you win you will earn a shit ton of subscribers!**",
      "**Tip: Short on subscribers? Ask a popular guy to shout you out by using `yt.shoutout`! You will get a significant amount of subscribers!**"
    ];
    
    if (Math.random() < 0.7 && !auto) return ""; // no tip
    return tips[Math.floor(Math.random() * tips.length)];
  }
} 
module.exports = YTSimClient;