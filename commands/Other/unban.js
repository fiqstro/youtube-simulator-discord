const Command = require('../../base/Command');
const Discord = require("discord.js");
const owners = require("../../config.json").owners;

module.exports = class Unban extends Command {
  constructor(client) {
    super(client, {
      name: "unban",
      description: "Unbans a user, and resets his stats. [DEV ONLY]",
      usage: " <user>",
      aliases: ["uban"],
      category: "Developer"
    })
    
  }
  
  async run(client, message, args) {    
    if (!owners.includes(message.author.id))
      return message.channel.send(`${client.no} | [Error] Access denied.`); 
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send(`${client.no} | User not found.`);
    try {
    let m = await message.channel.send(`Resetting user with id ${user.id}'s stats...`)
    client.db.delete(`yt_${user.id}`);
    client.db.delete(`ban_${user.id}`);
    m.edit(`${client.yes} | User with id **${user.id}** was unbanned!`)
    } catch(e) {
      console.error(`[ERROR] ${e}`)
      message.channel.send(`${client.no} | There was an error whilst trying to unban this user.`)
    }
  }
}