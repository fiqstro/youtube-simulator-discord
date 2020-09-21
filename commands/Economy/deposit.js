const Command = require('../../base/Command');
const Discord = require('discord.js');

module.exports = class Deposit extends Command {
  constructor(client) {
    super(client, {
      name: "deposit",
      description: "Deposits money into your bank account",
      aliases: ["dep"],
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
    let bal = client.db.get(`yt_${message.author.id}`, "balance.wallet");
    if(!args.length) return message.channel.send(`${client.no} | Please give me a valid amount!`)
    let amount = (args[0].toLowerCase() === "all") ? bal : Number(parseInt(args[0]).toFixed(2));
    if(isNaN(amount) || amount <= 0) return message.channel.send(`${client.no} | Please give me a valid amount!`);
    if(amount > bal) return message.channel.send(`${client.no} | You don't have that much money in your wallet!`);
    try {
      client.db.math(`yt_${message.author.id}`, "+", amount, "balance.bank");
      client.db.math(`yt_${message.author.id}`, "-", amount, "balance.wallet");
      message.channel.send(`${client.yes} | Sucsessfully deposited **${amount}$** into your bank!`)
    } catch(e) {
      return message.channel.send(`${client.no} | There was an error whilst trying to deposit money into your bank.`)
    }
  }
}