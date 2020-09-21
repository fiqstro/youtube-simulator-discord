const Discord = require('discord.js');

let Sharder = new Discord.ShardingManager("./index.js", {
  token: process.env.token
});

Sharder.spawn(2);

Sharder.on("launch", (shards) => {
  console.log(`[SUCSESS] Spawned ${shards.manager.totalShards} shards!`);
});
