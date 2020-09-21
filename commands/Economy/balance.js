const BaseCommand = require("../../base/Command"),
Discord = require('discord.js')

class Balance extends BaseCommand {
  constructor(client) {
    super(client, {
      name: "balance",
      description: "Shows your balance.",
      permLevel: 0,
      usage: "(user)",
      aliases: ["bal"],
      category: "Economy"
    });
  }
  async run(client,message,args) {
    let user = message.mentions.users.first() || message.author;
    let userProfileCheck = client.db.get(`yt_${user.id}`);
    if(!userProfileCheck) return message.channel.send(`${client.no} | This user doesn't have a profile yet!`);
    let banCheck = client.db2.get(`ban_${message.author.id}`);
    if(banCheck) return message.channel.send(`${client.no} | You have been banned from using **${client.user.username}**. Please contact an admin for more details.`)
    let userbalance = client.db.get(`yt_${user.id}`, "balance");
    message.channel.send(
    new Discord.MessageEmbed()
    .setTitle(`${user.username}'s balance`)
    .setThumbnail(user.displayAvatarURL({dynamic: true}))
    .setDescription(`**Wallet:** ${Number(userbalance.wallet.toFixed(2)).toLocaleString()}$\n**Bank:** ${Number(userbalance.bank.toFixed(2)).toLocaleString()}$`)
    .setColor("RED")
    );
  }
}

module.exports = Balance;