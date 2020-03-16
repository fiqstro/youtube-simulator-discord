let Discord = require('discord.js')
module.exports = (client, guild) => {
  let channel = client.channels.get("688000562695897099");
  channel.send(
    new Discord.RichEmbed()
    .setTitle("Server Left")
    .setColor("RED")
    .setThumbnail(guild.iconURL)
    .addField("Name", guild.name)
    .addField("Owner", guild.owner.user.tag)
    .addField("Member Count", guild.memberCount)
    .setFooter(`Total Guilds: ${client.guilds.size}`)
  )
}