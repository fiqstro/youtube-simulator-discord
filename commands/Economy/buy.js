const Command = require('../../base/Command');
const buyHandler = require('../../YouTube/shop/buyHandler');

module.exports = class Buy extends Command {
  constructor(client) {
    super(client, {
      name: "buy",
      description: "Buys an item from the shop.",
      aliases: ["b"],
      category: "Economy",
      usage: " <item>"
    })
  }
  async run(client,message,args) {
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {  
      return message.channel.send(`${client.no} | You don't have a profile yet! Please run \`${client.prefix}register\` to create one!`)
    } else {
      let banCheck = client.db2.get(`ban_${message.author.id}`);
      if(banCheck) return message.channel.send(`${client.no} | You have been banned from using **${client.user.username}**. Please contact an admin for more details.`)
    buyHandler.run(client,message,args);
    }
  }
}