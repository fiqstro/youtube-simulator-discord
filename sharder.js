const Discord = require('discord.js');
const shard = new Discord.ShardingManager("./index.js", {
  autoSpawn: true,
  token: process.env.TOKEN,
  totalShards: "auto"
});

shard.spawn();

shard.on("launch", (shards) => {
  console.log(`[${(new Date())}] - Spawned ${shards.manager.totalShards} Shard 👌`);
});

