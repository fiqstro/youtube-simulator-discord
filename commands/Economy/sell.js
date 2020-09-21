const Command = require('../../base/Command')
const sellManager = require('../../YouTube/shop/sell.js');

module.exports = class Sell extends Command {
  constructor(client) {
    super(client, {
      name: "sell",
      description: "Sells an item from your inventory.",
      usage: " <item>",
      category: "Economy"
    })
  }
  
  async run(client, message, args) {
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {  
      return message.channel.send(`${client.no} | You don't have a profile yet! Please run \`${client.prefix}register\` to create one!`)
    };
    let banCheck = client.db2.get(`ban_${message.author.id}`);
    if(banCheck) return message.channel.send(`${client.no} | You have been banned from using **${client.user.username}**. Please contact an admin for more details.`)
    sellManager.run(client,message,args);
  }
}