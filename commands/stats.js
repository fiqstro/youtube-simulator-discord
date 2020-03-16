const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");

module.exports = {
  name: "stats",
  description: "Shows the bot's status.",
  hidden: true,
  aliases: ["sts", "botinfo"],
  run: async (client, message, args) => {
    let heap = Math.floor(process.memoryUsage().heapTotal / 1024 / 1024);
    let usedHeap = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);

    let total = Math.floor(
      (process.memoryUsage().heapUsed +
        process.memoryUsage().rss +
        process.memoryUsage().external) /
        1024 /
        1024
    );
    let system = Math.floor(process.cpuUsage().user / 1024 / 1024);
    let db = client.db2
      .fetchAll()
      .filter(kk => kk.ID.startsWith("cmduse_"))
      .sort((a, b) => b.data - a.data);
    if (db.length > 3) db.length = 3;
    let arr = [];
    let i = 1;
    db.forEach(pog => {
      let id = pog.ID.split("_")[1];
      let executed = pog.data;
      arr.push(
        `${i++}. **${client.prefix}${id}** - **${Number(
          pog.data
        ).toLocaleString()}** uses`
      );
    });
    let owners = [
      "544922024301297691",
      "400845681574674442",
      "480933736276426763",
      "342421078066593803"
    ];
    let dbl = await client.dbl.getBot(client.user.id);
    let embed = new Discord.RichEmbed()
      .setTitle("Status")
      .addField(
        "Bot Info",
        `Username: **${client.user.username}** \nDiscrim: **${
          client.user.discriminator
        }** \nPing: **${Math.floor(client.ping)}ms**`,
        true
      )
      .addField(
        "Developers",
        `${owners.map(m => `<@!${m}>`).join(", ")}`,
        true
      )
      .addField(
        "Stats",
        `Guilds: **${client.guilds.size.toLocaleString()}** \nChannel: **${client.channels.size.toLocaleString()}** \nUsers: **${client.users.size.toLocaleString()}**`,
        true
      )
      .addField(
        "RAM",
        `Heap: **${heap}MB** \nUsed: **${usedHeap}MB** \nTotal: **${total}MB** \nSystem: **${system}MB**`,
        true
      )
      .addField("Most Popular Commands", arr.map(a => a) || "N/A", true)
      .addField("Websocket", `**Ping:** ${Math.round(client.ping)}ms`, true)
      .addField(
        "DBL",
        `**Monthly Votes**: ${dbl.monthlyPoints}\n**Total Votes:** ${
          dbl.points
        }\n**Approved Date:** ${moment(dbl.date).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`,
        true
      )
      .setColor(client.color)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL);

    message.channel.send({
      embed: embed
    });
  }
};
