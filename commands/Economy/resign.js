const Command = require('../../base/Command');
module.exports = class Resign extends Command {
  constructor(client) {
    super(client, {
      name: "resign",
      description: "Allows you to quit your job if you want to switch to a new one!",
      aliases: ["quitjob"],
      category: "Economy"
    })
  }
  async run(client, message, args) {
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {  
      return message.channel.send(`${client.no} | You don't have a profile yet! Please run \`${client.prefix}register\` to create one!`)
    }
    let banCheck = client.db2.get(`ban_${message.author.id}`);
    if(banCheck) return message.channel.send(`${client.no} | You have been banned from using **${client.user.username}**. Please contact an admin for more details.`)
    // command
    let currentJob = client.db.get(`yt_${message.author.id}`, "job");
    if(!currentJob) return message.channel.send(`${client.no} | You don't have a job currently!`);
    const filter = a => a.author.id === message.author.id;
    let m = await message.reply(`do you want to stop working as a **${currentJob.name}**? (yes or no)`)
    message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ["time"]}).then(c => {
      let msg = c.first().content.toLowerCase();
      if(msg === "yes") {
        client.db.delete(`yt_${message.author.id}`, "job");
        message.channel.send(`${client.yes} | You are no longer a **${currentJob.name}**.`)
      } else if(msg === "no") {
        return message.channel.send(`${client.no} | User declined, resign request canceled.`)
      } else {
        return message.channel.send(`${client.no} | Not a valid response, resign request canceled.`)
      }
    }).catch(e => {
      console.log(e);
      return message.channel.send(`${client.no} | No response provided, resign request canceled.`)
    })
  }
}