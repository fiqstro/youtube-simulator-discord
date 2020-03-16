let Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Shows a list of commands.",
  aliases: ["commands", "cmds"],
  cooldown: 5,
  run: async (client, message, args) => {
    let page = 1;
    let pages = ["Help", "Help", "Help"];
    let p2 = client.commands
      .array()
      .filter(a => !a.hidden)
      .map(a => `**${client.prefix}${a.name}**\n${a.description}`)
      .slice(10, 20);
    let p3 = client.commands
      .array()
      .filter(a => !a.hidden)
      .map(a => `**${client.prefix}${a.name}**\n${a.description}`)
      .slice(20, 30);
    let p1 = client.commands
      .array()
      .filter(a => !a.hidden)
      .map(a => `**${client.prefix}${a.name}**\n${a.description}`);
    p1.length = 10;
    let pagei = [p1, p2, p3];
    let embeded = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle(`${pages[page-1]} - ${page}/${pages.length}`)
      .setDescription(pagei[page - 1])
      .setFooter(`Join our support server: https://discord.gg/gtzZkhP`);

    let embed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle(`${pages[page-1]} - ${page}/${pages.length}`)
      .setDescription(pagei[page - 1])
      .setFooter(`Join our support server: https://discord.gg/gtzZkhP`);

    message.channel.send(embed).then(msg => {
      msg.react("⬅").then(r => {
        msg.react("➡");

        // Filters
        const backwardsFilter = (reaction, user) =>
          reaction.emoji.name === "⬅" && user.id === message.author.id;
        const forwardsFilter = (reaction, user) =>
          reaction.emoji.name === "➡" && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsFilter, {
          timer: 1000
        });
        const forwards = msg.createReactionCollector(forwardsFilter, {
          timer: 1000
        });

        backwards.on("collect", r => {
          if (page === 1) return;
          page--;
          embeded.setTitle(`${pages[page-1]} - ${page}/${pages.length}`);
          embeded.setDescription(pagei[page - 1]);
          msg.edit(embeded);
          r.remove(r.users.filter(u => u === message.author).first()).catch(
            e => {}
          );
        });

        forwards.on("collect", r => {
          if (page === pages.length) return;
          page++;
          embeded.setTitle(`${pages[page-1]} - ${page}/${pages.length}`);
          embeded.setDescription(pagei[page - 1]);
          msg.edit(embeded);
          r.remove(r.users.filter(u => u === message.author).first()).catch(
            e => {}
          );
        });
      });
    });
  }
};
