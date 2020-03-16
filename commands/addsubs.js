module.exports = {
name: "addsubs",
hidden: true,
aliases: ["as"],
run: async (client, message, args) => {
  let owners = [
  "681746185073065985",
  "400845681574674442",
  "480933736276426763"
];
  
  if (!owners.includes(message.author.id)) return;
let amount = Number(args[0]);
if(isNaN(amount)) return;
if(!amount) return;
let user = message.mentions.users.first();
if(!user) return;
let bal = client.db.get(`yt_${user.id}`, "yt.subscribers")
client.db.set(`yt_${user.id}`, bal + amount, "yt.subscribers")
  message.channel.send(`added ${amount} subs`)
}}