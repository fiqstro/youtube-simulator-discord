const Command = require('../../base/Command');
const Discord = require('discord.js');
const profileSetUpManager = require('../../setup/setupUser.js');

class Profile extends Command {
constructor(client) {
  super(client, {
    name: "profile",
    description: "Shows a user's profile",
    aliases: ["pr"],
    category: "Youtube",
    usage: "(user)"
  })
}  
  async run(client, message, args) { 
    const user = message.mentions.users.first() || message.author;
    let userProfileCheck = client.db.get(`yt_${user.id}`);
    if(!userProfileCheck) return message.channel.send(`${client.no} | There's nothing in this user's profile!`)
    let channel = client.db.get(`yt_${user.id}`, "channel")
    let category = client.db.get(`yt_${user.id}`, "category.name")
    let inventory = userProfileCheck.inventory;
    if(inventory===null) inventory = [];
    let totalCostPerVideo = 0;
    Object.values(inventory).forEach(i => {
      totalCostPerVideo += i.costPerVideo;
    });
    message.channel.send(
    new Discord.MessageEmbed()
      .setTitle(`${user.username}'s profile`)
      .setColor("RED")
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .addField("Channel Name", channel.name, true)
      .addField("Channel Topic", `${category}`, true)
      .addField("Total Subscribers", channel.subscribers.toLocaleString(), true)
      .addField("Total Likes", channel.likes.toLocaleString(), true)
      .addField("Views", Math.floor(channel.views).toLocaleString(), true)
      .addField("Level", `**XP:** ${userProfileCheck.xp}/${userProfileCheck.level * 200}\n**Level:** ${userProfileCheck.level}`, true)
      .addField("Cost per upload", `${totalCostPerVideo}$`)
    );
  }
};
module.exports = Profile;