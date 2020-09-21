const Command = require('../../base/Command');
const Discord = require('discord.js');
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment") 
require('moment-duration-format')
const { version } = require("discord.js");

module.exports = class Stats extends Command {

constructor(client) {
  super(client, {
    name: "stats",
    description: "Shows the current bot statistics.",
    category: "Info",
    aliases: ["st"]
  })
}
  
  async run(client,message,args) {
  
  cpuStat.usagePercent(async function(err, percent, secs) {
              if (err) {
                return console.log(err);
              }
    // Uptime
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let used = Number((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))
    let total = Number((process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2))
    let memory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${total}MB`
    let cpu = Number(percent.toFixed(2))
    
    
    let total_rss = require('fs').readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8").split("\n").filter(l => l.startsWith("total_rss"))[0].split(" ")[1];
    let rampercent = Math.round((total_rss / 512) * 1000) / 10; 
    let ramusage = Math.round(Number(total_rss) / 1e6 ) - 60;
  
    // container status
      
    let serverCount = await client.getServerCount();
    
    
    /**//**//**//**//**//**//**//**//**//**//**/
    message.channel.send(
    
    new Discord.MessageEmbed()
      .setTitle(`Stats - ${client.user.username}`)
      .setDescription("Here are the stats for the bot.")
      .setColor("RED")
      .addField(`Basic Stats`, `Ping: \`${client.ws.ping}ms\`\nUptime: **${days}d, ${hours}h, ${minutes}m**\nVersion: **${version}**`, true)
      .addField(`Bot Stats`, `Servers: **${serverCount}**\nShards: **${client.shard.count}**`, true)
      .addField(`Container Status`, `Heap: **${memory}**\n${client.createBar(used, total, 15).bar}
      RAM Usage: **${ramusage}/512MB**\n${client.createBar(ramusage,512,15).bar}
      CPU: **${cpu}%**\n${client.createBar(cpu,100,15).bar}`)
    )
    
    })
  }
  
}