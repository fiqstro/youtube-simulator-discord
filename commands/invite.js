let Discord = require('discord.js')

module.exports = {
  name: "invite",
  description: "Gives you the bot invite link.",
  aliases: ["inv"],
  run: async (client, message, args) => {
    message.channel.send(new Discord.RichEmbed()
                        .setTitle(`Invite ${client.user.username}`)
                         .setColor("RED")
                        .addField("Invite Link", `You can invite me to your server by clicking [here](https://discordapp.com/api/oauth2/authorize?client_id=681376963356524558&permissions=0&scope=bot)`))
  }
}