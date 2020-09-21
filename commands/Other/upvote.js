const Command = require("../../base/Command");
const Discord = require('discord.js');

class Upvote extends Command {
  constructor(client) {
    super(client, {
      name: "upvote",
      permLevel: 0,
      description: "Allows a user to upvote the bot",
      category: "Other",
      usage: ""
    });
  };

  async run(client, message, args) {
    message.channel.send({
      embed: {
          color: parseInt(client.color),
          description: `Vote for this bot [here](https://top.gg/bot/${client.user.id}/)`,
      }
    });
  };
};

module.exports = Upvote;