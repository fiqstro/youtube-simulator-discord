const Discord = require("discord.js");

module.exports = {
  name: "shards",
  aliases: ["srds"],
  description: "Shows the bot's shards",
  hidden: true,
  run: async(client, message, args) => {
    client.shard.fetchClientValues('guilds.size').then(a => {
console.log(a)
    })
  }
}