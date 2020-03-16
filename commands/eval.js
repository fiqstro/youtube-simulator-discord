const Discord = require("discord.js");
const safeEval = require("safe-eval");

module.exports = {
name: "eval",
aliases: ['ev'],
hidden: true,
description: "Nothing to see here.",
run: async (client, message, args) => {
  let fashishi = client;

  const clean = text => {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };
let owners = [
  "681746185073065985",
  "400845681574674442",
  "480933736276426763",
  "544922024301297691"
];
  
  if (!owners.includes(message.author.id)) {
    let conxtext = {
      set: require("discord-set"),
      client: "[FuckYou]",
      process: "nou",
      ms: require("ms"),
      moment: require("moment")
    };
    
    if (!args[0])
      return message.channel.send(`:x: Please provide code to eval.`);
    try {
      const code = args.join(" ");
      let evaled = safeEval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      const embed = new Discord.RichEmbed()
        .setAuthor("EVALUATION (SAFE)", message.author.displayAvatarURL)
        .setColor(123456)
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${code}\`\`\``)
        .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(evaled)}\`\`\``, false)
        .addField(`📄TYPE📄`, `\`\`\`js\n${typeof evaled}\`\`\``, false)
        .setFooter("OUTCOME: SUCCESS!", client.user.displayAvatarURL)
        .setTimestamp();
      return message.channel.send(embed)
      .catch(e => {
        const embed = new Discord.RichEmbed()
        .setAuthor("EVALUATION (SAFE)", message.author.displayAvatarURL)
        .setColor("#FF0000")
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(e.message)}\`\`\``, false)
        .setFooter("OUTCOME: ERROR!", client.user.displayAvatarURL)
        .setTimestamp();
      return message.channel.send(embed)
      });
    } catch (err) {
      const embed = new Discord.RichEmbed()
        .setAuthor("EVALUATION (SAFE)", message.author.displayAvatarURL)
        .setColor("#FF0000")
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(err)}\`\`\``, false)
        .setFooter("OUTCOME: ERROR!", client.user.displayAvatarURL)
        .setTimestamp();
      return message.channel.send(embed);
    }
  } else {
    const code = args.join(" ");

    if (!args[0])
      return message.channel.send(`:x: Please provide code to eval.`);
    try {
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      const embed = new Discord.RichEmbed()
        .setAuthor("EVALUATION", message.author.displayAvatarURL)
        .setColor(123456)
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${code}\`\`\``)
        .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(evaled)}\`\`\``, false)
        .addField(`📄TYPE📄`, `\`\`\`js\n${typeof evaled}\`\`\``, false)
        .setFooter("OUTCOME: SUCCESS!", client.user.displayAvatarURL)
        .setTimestamp();
      return message.channel.send(embed)
      .catch(e => {
        const embed = new Discord.RichEmbed()
        .setAuthor("EVALUATION", message.author.displayAvatarURL)
        .setColor("#FF0000")
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(e.message)}\`\`\``, false)
        .setFooter("OUTCOME: ERROR!", client.user.displayAvatarURL)
        .setTimestamp();
      return message.channel.send(embed)
      });
    } catch (err) {
      const embed = new Discord.RichEmbed()
        .setAuthor("EVALUATION", message.author.avatarURL)
        .setColor("#FF0000")
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${code}\`\`\``)
        .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(err)}\`\`\``)
        .setFooter("OUTCOME: ERROR!", client.user.displAyvatarURL)
        .setTimestamp();
      return message.channel.send(embed);
    }
  }
}}