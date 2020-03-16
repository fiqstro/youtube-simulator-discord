let Discord = require("discord.js")

module.exports = {
name: "shop",
description: 'Displays the shop',
aliases: ["market"],
cooldown: 3,
run: async (client, message, args, janix) => {
if(!args.length) return message.channel.send(`${janix.no} | Please do either **${client.prefix}shop** games, or **${client.prefix}shop** devices!`)
if(args[0].toLowerCase() === "games") {
let embed = new Discord.RichEmbed()
.setTitle("Shop")
.setThumbnail(message.author.avatarURL)
.setColor("RED")

client.shop.forEach(a => {
  let cost = (a.cost === 0) ? "FREE" : a.cost + "$";
  embed.addField(`${a.displayname}`, `**Cost: **${cost}\n**Require:** Level ${a.requireLevel}\n**Device Required:** ${a.require || ""} ${a.pcRequire || "None"}`, true)
})
message.channel.send(embed)
} else if(args[0].toLowerCase() === "devices") {
  let embed = new Discord.RichEmbed()
.setTitle("Shop")
.setThumbnail(message.author.avatarURL)
.setColor("RED")

client.devices.forEach(a => {
  let cost = (a.cost === 0) ? "FREE" : a.cost + "$";
  embed.addField(`${a.emoji} ${a.displayname}`, `Cost: ${cost}\n${a.bc} break chance`, true)
})
message.channel.send(embed)
} else {
  return message.channel.send(`${janix.no} | Please do either **${client.prefix}shop** games, or **${client.prefix}shop** devices!`)
}
}}