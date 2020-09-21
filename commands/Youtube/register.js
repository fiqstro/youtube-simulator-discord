const BaseCommand = require('../../base/Command');
const Discord = require("discord.js");
const profileSetUpManager = require('../../setup/setupUser.js');

class Register extends BaseCommand {
  constructor(client) {
    super(client, {
      name: "register",
      description: "Allows you to create a profile!",
      aliases: ["reg"],
      category: "Youtube"
    });
  }
  
  async run(client,message,args){
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {     
      profileSetUpManager.setup(client, message, args); 
    } else {
      return message.channel.send(`${client.no} | You already have a profile!`);
    }    
  }
}

module.exports = Register;