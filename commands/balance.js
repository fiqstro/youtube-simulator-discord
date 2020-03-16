module.exports = {
name: "balance",
description: "How much money you have.",
aliases: ["bal"],
cooldown: 5,
run: async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
  let balance = client.db.get(`yt_${user.id}`,"bal") || {
    wallet: 0,
    bank: 0
  }
  
  let Discord = require('discord.js')
  message.channel.send(
    new Discord.RichEmbed()
    .setTitle(`${user.username}'s profile!`)
    .addField("Wallet", (balance.wallet || 0).toLocaleString() + "$")
    .addField("Bank", (balance.bank || 0).toLocaleString() + "$")
    .setColor("RED")
  )
}}