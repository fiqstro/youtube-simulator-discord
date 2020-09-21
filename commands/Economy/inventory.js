const Command = require('../../base/Command');
const Discord = require('discord.js');
module.exports = class Inventory extends Command {
  constructor(client) {
    super(client, {
      name: "inventory",
      aliases: ["inv"],
      usage: " (user)",
      description: "Shows the items you currently have in your inventory",
      category: "Economy"
    })
  }
  async run(client,message,args) {
    let user = message.mentions.users.first() || message.author;
    let userProfileCheck = client.db.get(`yt_${user.id}`);
    if(!userProfileCheck) return message.channel.send(`${client.no} | This user doesn't have a profile yet!`);
    let inventory = userProfileCheck.inventory;
    if(inventory===null) return message.channel.send(`${client.no} | This user doesn't have anything in his/her inventory!`);
    const e = new Discord.MessageEmbed()
    .setTitle(`Inventory - ${user.username}`)
    .setColor("RED")
    let totalCostPerVideo = 0;
    Object.values(inventory).forEach(i => {
      e.addField(`${i.icon} ${i.name} x${i.quantity}`, `Sell price: $${i.sellPrice.toFixed(2)}`)
      totalCostPerVideo += i.costPerVideo;
    })
    e.setFooter(`Cost per video: $${totalCostPerVideo}`);
    message.channel.send(e);
  }
}