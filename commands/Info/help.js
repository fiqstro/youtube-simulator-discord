const Command = require('../../base/Command');
const Discord = require('discord.js')
module.exports = class Help extends Command {
  constructor(client) {
  super(client, {
  name: "help",
  description: "Shows a list of commands!",
  usage: "<category-name>",
  aliases: ["commands", "cmds"],
  category: "Info"
  });
  }
  
  async run(client,message,args) {
    if(!args.length) {
      message.channel.send(
      new Discord.MessageEmbed()
      .setTitle("Help Menu")
      .setColor("RED")
      .setDescription(
      `We have a total of ${client.commands.size} commands!\nHere are the availible categories that you can choose:\n` +
      "`Youtube`, `Economy`, `Info`, `Other`\n" +
      "If you want to view a category, run `" + client.prefix + "help <category-name>`!\n\n"
      + "\nIf you have any questions, join our [Support Server](https://discord.gg/zj8Z28R)!\n"+
      "Also if you are generous, please [upvote our bot](https://top.gg/bot/681376963356524558/vote)!"
      )
      )
    } else {
      let categoryName = args[0].toLowerCase();
      let commands = client.commands.filter(a => a.help.category.toLowerCase() === categoryName).array();
      let txt = "";
      if(!commands.length) return message.channel.send(`${client.no} | Unable to find that category!`)
      commands.forEach(command => {
        txt += `**${client.prefix}${command.help.name} ${command.help.usage}** -` + `${command.help.description}\n`
      })
      let embed = new Discord.MessageEmbed().setColor("RED").setTitle("Help Menu").setDescription("<> => Required | () => Optional\n\n" + txt).setFooter(`Total commands in this category: ${commands.length}`)
      message.channel.send(embed);
    }
  }
}