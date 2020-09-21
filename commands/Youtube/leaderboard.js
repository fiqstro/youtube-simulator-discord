const Command = require('../../base/Command');
const Discord = require('discord.js');
module.exports = class Leaderboard extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      description: "Shows a list of top users.",
      usage: " (global)",
      aliases: ["lb", "top"],
      category: "Youtube"
    })
  }
  
  async run(client, message, args) {
    // variables
    let badges = [
      "🥇",
      "🥈",
      "🥉",
      "\n🎗️"
    ]
    
    // functions
    async function showGuildLeaderboard() {
    let filtered = client.db.filter(a => a.channel && message.guild.member(a.id) && !client.db.get(`ban_${a.id}`) && a.channel.subscribers > 0).array();
    let leaderboard = filtered.sort((a,b)=>b.channel.subscribers - a.channel.subscribers).slice(0, 10);
    if(!leaderboard.length) return message.channel.send(`${client.no} | There is no one with a profile on this server. Please try again later.`);
    let embed = new Discord.MessageEmbed()
    .setTitle(`Leaderboard - ${message.guild.name}`)
    .setColor("RED")
    .setDescription(leaderboard.map(a => `${badges[leaderboard.indexOf(a)] || "🎗️"} ${leaderboard.indexOf(a)+1}. **${a.channel.name}** - ${a.channel.subscribers.toLocaleString()} subscribers`))
    message.channel.send(embed)
    }
    
    async function showGlobalLeaderboard() {
      let filtered = client.db.filter(a => a.channel && !client.db.get(`ban_${a.id}`) && a.channel.subscribers > 0).array();
    let leaderboard = filtered.sort((a,b)=>b.channel.subscribers - a.channel.subscribers).slice(0, 10);
    if(!leaderboard.length) return message.channel.send(`${client.no} | There is no one with subscribers on this server. Please try again later.`);
    let embed = new Discord.MessageEmbed()
    .setTitle(`Leaderboard - ${client.user.username}`)
    .setColor("RED")
    .setDescription(leaderboard.map(a => `${badges[leaderboard.indexOf(a)] || "🎗️"} ${leaderboard.indexOf(a)+1}. **${a.channel.name}** - ${a.channel.subscribers.toLocaleString()} subscribers`))
    message.channel.send(embed)
    }
    
    // command shit
    if(!args.length) {
    showGuildLeaderboard();
    } else if(args[0].toLowerCase() === "global"){
    showGlobalLeaderboard();
    } else {
    showGuildLeaderboard();
    }
  }
}