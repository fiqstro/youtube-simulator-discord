let Discord = require('discord.js')

module.exports = {
  name: "support",
  description: "Need support? Just join our support server.",
  aliases: ["discord", "server"],
  run: async (client, message, args) => {

    message.channel.send(new Discord.RichEmbed()
                        .setTitle("Support Server")
                        .setDescription("You can join our support server by clicking [here](https://discord.gg/muYvTE7)")
                        .setColor("RED")
                        )
    
  }
}