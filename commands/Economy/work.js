const Command = require("../../base/Command"),
Discord = require('discord.js'),
WorkManager = require('../../work/workManager')

class Work extends Command {
  constructor(client) {
    super(client, {
      name: "work",
      permLevel: 0,
      category: "Economy",
      usage: " (jobs/list or <job-name>)",
      description: "Allows you to earn money, by working hard!"
    });
  };
  async run(client, message, args) {
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {  
      return message.channel.send(`${client.no} | You don't have a profile yet! Please run \`${client.prefix}register\` to create one!`)
    }
    WorkManager.run(client, message, args);
  };
};

module.exports = Work;