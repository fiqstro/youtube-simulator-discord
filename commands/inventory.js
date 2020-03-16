let Discord = require('discord.js')

module.exports = {
  name: "inventory",
  description: "Shows all of your devices, and the one you are currently equipping.",
  aliases: ["inv", "devices"],
  run: async (client, message, args) => {

    let allLaptops = client.db.get(`yt_${message.author.id}`, "laptops")
    let current = client.db.get(`yt_${message.author.id}`, "currentlaptop");
    
    message.channel.send(
    new Discord.RichEmbed()
    .setTitle("Inventory")
    .setColor("RED")
    .addField("Equipped", `**${current.emoji} ${current.displayname}**\n${current.bc} break chance`)
    .addField("All Items", allLaptops.map(a => `**${a.emoji} ${a.displayname}**\n${a.bc} break chance`).join('\n'))  
    )
    
  }
}