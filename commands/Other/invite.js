const Command = require('../../base/Command');
const Discord = require('discord.js')

class Upvote extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      permLevel: 0,
      description: "Sends the bot invite link",
      category: "Other",
      usage: ""
    });
  };

  async run(client, message, args) {
    message.channel.send({
      embed: {
          color: parseInt(client.color),
          description: `Invite this bot [here](https://discord.com/api/oauth2/authorize?client_id=689790932178305262&permissions=16384&scope=bot)`,
      }
    });
  };
};

module.exports = Upvote;