const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: false,
  disabledEvents: ["TYPING_START"]
});
const fs = require("fs");
const Enmap = require("enmap");
const DBL = require("dblapi.js");
client.commands = new Enmap();
client.prefix = "yt.";
client.devices = new Enmap();
client.cooldowns = new Discord.Collection();
client.color = "RED";
client.dbl = new DBL(
  process.env.DBL,
  { webhookPort: 5000, webhookAuth: process.env.auth },
  client
);
client.db = new Enmap({
  name: "database",
  fetchAll: false,
  autoFetch: true,
  ensureProps: true
});
client.db2 = require("quick.db");
client.comments = require("./replies/comments");
client.shop = new Enmap();
client.addmoney = (user, amount) => {
  let newbalance = client.db.get(`yt_${user}`, "bal.wallet");
  newbalance += amount;
  client.db.set(`yt_${user}`, newbalance, "bal.wallet");
};
client.removemoney = (user, amount) => {
  let newbalance = client.db.get(`yt_${user}`, "bal.wallet");
  newbalance -= amount;
  client.db.set(`yt_${user}`, newbalance, "bal.wallet");
};
client.getTip = (auto = false) => {
  let tips = [
    "**Tip: If you want to get more subscribers, do `yt.upvote`! It will give you +5% subscribers. (100 Bonus)**",
    "**Tip: If you want to make someone lose subscribers, try and expose them by doing `yt.expose <user>`! But failing could make you lose subs!**",
    "**Tip: Poor? Tired of begging? No problem! You can rob someone by using `yt.rob <user>`, to get money! But failing could make you lose subs!**",
    "**Tip: You can start a drama with a user, by using `yt.drama`. and if you win you will earn a shit ton of subscribers!**",
    "**Tip: Short on subscribers? Ask a popular guy to shout you out by using `yt.shoutout`! You will get a significant amount of subscribers!**",
    "**Tip: You can have a chance to get 100,000+ subscribers by joining lotteries. To join, just run `yt.lottery`! Lottery results will be in our official server :)**"
  ];
  if (Math.random() < 0.7 && !auto) return ""; // no tip
  return tips[Math.floor(Math.random() * tips.length)];
};
client.addbank = (user, amount) => {
  let newbalance = client.db.get(`yt_${user}`, "bal.bank");
  newbalance += amount;
  client.db.set(`yt_${user}`, newbalance, "bal.bank");
};
client.removebank = (user, amount) => {
  let newbalance = client.db.get(`yt_${user}`, "bal.bank");
  newbalance -= amount;
  client.db.set(`yt_${user}`, newbalance, "bal.bank");
};
client.dbl.webhook.on("ready", hook => {
  console.log(
    `Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`
  );
});
client.dbl.webhook.on("vote", vote => {
  console.log(`User with ID ${vote.user} just voted! Type: ${vote.type}`);
  if (vote.type === "test") return;
  let voteLog = client.channels.get("688339910515752997");
  if (!voteLog) return;
  
  const embed = new Discord.RichEmbed()
  .setAuthor("Upvote Received!")
  .addField("User", `<@!${vote.user}>`)
  .addField("Vote At", `Time: ${new Date()}`)
  .setColor("#7289DA")
  .setTimestamp()
  voteLog.send(embed)
  client.db.ensure(`yt_${vote.user}`, { subscribers: 0 })
  let subs = client.db.get(`yt_${vote.user}`, "yt.subscribers");
  // the user isnt ensured in the db thats why an error popped up
  let amt = Math.round(subs * 0.05) + 100;
  client.db.set(`yt_${vote.user}`, subs + amt, "yt.subscribers");
  client.users
    .get(vote.user)
    .send(`Thanks for voting me! You got **${amt}** subscribers as a reward.`)
    .catch(e => {});
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    client.commands.set(props.name, props);
  });
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    if (!file.endsWith("js")) return;
    const event = require(`./events/${file}`);
    let eventname = file.split(".")[0];
    client.on(eventname, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(process.env.TOKEN);
module.exports = client;

require("./app");
