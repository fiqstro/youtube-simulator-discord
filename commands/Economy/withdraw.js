const Command = require('../../base/Command');

module.exports = class Withdraw extends Command {
  constructor(client) {
    super(client, {
      name: "withdraw",
      description: "Withdraws a certain amount in your balance.",
      aliases: ["with"],
      usage: "<amount/all>",
      category: "Economy"
    });
  }
  async run(client,message,args) {
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {  
      return message.channel.send(`${client.no} | You don't have a profile yet! Please run \`${client.prefix}register\` to create one!`)
    };
    let banCheck = client.db2.get(`ban_${message.author.id}`);
    if(banCheck) return message.channel.send(`${client.no} | You have been banned from using **${client.user.username}**. Please contact an admin for more details.`)
    let bal = client.db.get(`yt_${message.author.id}`, "balance.bank");
    if(!args.length) return message.channel.send(`${client.no} | Please give me a valid amount!`)
    let amount = (args[0].toLowerCase() === "all") ? bal : parseInt(args[0]);
    if(isNaN(amount) || amount <= 0) return message.channel.send(`${client.no} | Please give me a valid amount!`);
    if(amount > bal) return message.channel.send(`${client.no} | You don't have that much money in your bank!`);
    try {
      client.db.math(`yt_${message.author.id}`, "+", amount, "balance.wallet");
      client.db.math(`yt_${message.author.id}`, "-", amount, "balance.bank");
      message.channel.send(`${client.yes} | Sucsessfully withdrawn **${amount.toFixed(2)}$** into your wallet!`)
    } catch(e) {
      return message.channel.send(`${client.no} | There was an error whilst trying to withdraw money from your bank.`)
    }
  }
}