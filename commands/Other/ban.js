const Command = require("../../base/Command");
const Discord = require("discord.js");
const owners = require("../../config.json").owners;

module.exports = class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "Bans a user from the leaderboard. [DEV ONLY]",
      category: "Developer",
      usage: " <user>",
      aliases: ["blacklist"]
    })
  }
  
  run(client, message, args) {
    if (!owners.includes(message.author.id))
      return message.channel.send(`${client.no} | [Error] Access denied.`);
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);  
    if(!user) return message.channel.send(`${client.no} | User not found.`);
    try {
    client.db.set(`ban_${user.id}`, true);
    message.channel.send(`${client.yes} | User with id **${user.id}** was banned!`)
    } catch(e) {
      console.error(`[ERROR] ${e}`)
      message.channel.send(`${client.no} | There was an error whilst trying to ban this user.`)
    }
  } 
};