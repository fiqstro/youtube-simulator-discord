let Discord = require('discord.js')
module.exports = (client, guild) => {
  let channel = client.channels.get("688000562695897099");
  channel.send(
    new Discord.RichEmbed()
    .setTitle("Server Joined")
    .setColor("GREEN")
    .setThumbnail(guild.iconURL)
    .addField("Name", guild.name)
    .addField("Owner", guild.owner.user.tag)
    .addField("Member Count", guild.memberCount)
    .setFooter(`Total Guilds: ${client.guilds.size}`)
  )
  let channel2 = guild.defaultChannel;
  if (!channel2) return;
  channel2.send(new Discord.RichEmbed()
  .setTitle("Thanks for adding me!")
  .setThumbnail(client.user.avatarURL)
  .setColor("RED")
  .setDescription("To get started, do `yt.help`! If you have any other questions, please join our [support server](https://discord.gg/muYvTE7)!")
               )
}