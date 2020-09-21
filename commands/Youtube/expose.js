const Command = require('../../base/Command');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
const cmd = require('../../YouTube/expose/command.js')

module.exports = class Expose extends Command {
  
  constructor(client) {
    super(client, {    
      name: "expose",
      description: "Exposes a user and gain subscribers!",
      category: "Youtube",
      aliases: ["ex"],
      usage: "<user>"
    })
  }
  
  async run(client,message,args) {
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {  
      return message.channel.send(`${client.no} | You haven't registered on youtube simulator yet! Please run \`${client.prefix}register\` to create one!`)
    } else {
      let banCheck = client.db2.get(`ban_${message.author.id}`);
      if(banCheck) return message.channel.send(`${client.no} | You have been banned from using **${client.user.username}**. Please contact an admin for more details.`)
      let cooldown = 1.8e+7;
      let iscooldown = client.db2.get(`sus_${message.author.id}`);
      if(iscooldown !== null && cooldown - (Date.now() - iscooldown) > 0) return message.channel.send(`${client.no} | Your channel is currently suspended. Please wait **${moment.duration(cooldown - (Date.now() - iscooldown)).format("h [hours], m [minutes and] s [seconds]")}** before you can upload any videos.`)
      try {

        
        
      cmd.run(client,message,args);
      } catch(e) {
        console.log(e);
      }
      
    }
    
  }
  
}