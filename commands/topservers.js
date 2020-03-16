let Discord = require('discord.js')

module.exports = {
name: "topservers",
description: "Shows the most popular servers that this bot is in.",
hidden: true,
run: async (client, message, args) => {
  
  let lb = client.guilds.array().sort((a, b) => b.memberCount > a.memberCount || -(b.memberCount < a.memberCount)) 
  message.channel.send(
    new Discord.RichEmbed()
    .setTitle("Top Servers - Youtube Simulator")
    .setColor("RED")
    .setDescription(lb.map(a => `**${a.name} - ${a.memberCount} members \n`).slice(0, 10))
  )
  
}}