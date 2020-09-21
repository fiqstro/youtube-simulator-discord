const Command = require('../../base/Command');
const Discord = require('discord.js')
module.exports = class Deposit extends Command {
  constructor(client) {
    super(client, {
      name: "shop",
      description: "Shows a list of items/boosters that you can buy",
      aliases: ["store", "market"],
      category: "Economy"
    });
  }
  async run(client,message,args) {
    
  //  if(!args.length) {
      let embed = new Discord.MessageEmbed()
      .setTitle(`YTSM Shop`)
      .setDescription("Here are a list of availible items that you can buy from the shop!")
      .setColor("RED")
      
      client.shop.forEach(item => {
        embed.addField(`${item.icon} ${item.name} - $${item.cost}`, `${item.description}`)
      });
      message.channel.send(embed)
    //}
    
  }
}