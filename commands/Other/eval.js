const Command = require("../../base/Command");
const Discord = require("discord.js");
const owners = require("../../config.json").owners;

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evaluates something.",
      category: "Developer",
      usage: "",
      aliases: ["ev", "evaluate"]
    });
  }

  async run(client, message, args) {
    if (!owners.includes(message.author.id))
      return message.channel.send(`${client.no} | no`);
    function clean(a) {
      if (typeof a === "string") {
        return a
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      } else {
        return a;
      }
    }

    if (!args.join(" "))
      return message.channel.send(`${client.no} | No code provided.`);
    try {
      let c = args.join(" ");
      let ev = eval(c);
      if (typeof e !== "string") ev = require("util").inspect(ev);
      message.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Evaluation Successful!")
            .setColor("GREEN")
            .setDescription("```xl\n" + clean(ev) + "\n```")
        )
        .catch(e => {
          console.log(clean(ev));
          return message.channel.send(`${client.yes} | Please check logs.`);
        });
    } catch (e) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Error")
          .setColor("RED")
          .setDescription("```xl\n" + e + "\n```")
      );
    }
  }
}

module.exports = Eval;
