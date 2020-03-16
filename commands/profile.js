module.exports = {
name: "profile",
description: "Shows your youtube profile.",
cooldown: 5,
run: async (client, message, args, janix) => {
  let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
  let check = client.db.get(`yt_${user.id}`);
  if(!check || check === null) {
return message.channel.send(`${janix.no} | This user has nothing is his profile yet.`)
  }
  let Discord = require('discord.js');
  let level = client.db.get(`yt_${user.id}`, "level");
  let xp = client.db.get(`yt_${user.id}`, "xp");
  let balance = client.db.get(`yt_${user.id}`, "bal.bank") + client.db.get(`yt_${user.id}`, "bal.wallet")
  let videos = client.db.get(`yt_${user.id}`, "yt.totalvideos")
  let revenue = client.db.get(`yt_${user.id}`, "bal.rev")
  let awards = client.db.get(`yt_${user.id}`, "awards.all");
  if(!awards) awards = [];
  let a = (awards[0]) ? awards.join(' ') : "None"
  let currentPrestige = (client.db.get(`yt_${user.id}`, "prestige")) ? `${client.db.get(`yt_${user.id}`, "prestige.icon")}` : "None"
  message.channel.send(new Discord.RichEmbed()
             .setTitle(`${user.username}'s profile`)
             .setColor("RED")
             .setThumbnail(user.displayAvatarURL)
             .addField("Subscribers", Math.floor(client.db.get(`yt_${user.id}`, "yt.subscribers")).toLocaleString(), true)
             .addField("Total Views", Math.floor(client.db.get(`yt_${user.id}`, "yt.totalviews")).toLocaleString(), true)
             .addField("Total Likes", Math.floor(client.db.get(`yt_${user.id}`, "yt.likes")).toLocaleString(), true)
             .addField("Total Dislikes", Math.floor(client.db.get(`yt_${user.id}`, "yt.dislikes")).toLocaleString(), true)
             .addField('Total Videos', videos, true)
             .addField("Level", `**${level}** (${xp}/${level * 50}XP)`, true)
             .addField("Prestige", `${currentPrestige}`, true)
             .addField("Awards", a)
             )               
}}

// hosting shit