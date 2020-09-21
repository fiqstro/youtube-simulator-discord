const Command = require('../../base/Command');
const Discord = require('discord.js');
const profileSetUpManager = require('../../setup/setupUser.js');
const uploadManager = require('../../uploadHandler/upload.js');
const moment = require('moment')
require('moment-duration-format')

class Upload extends Command {
  constructor(client) {
    super(client, {
      name: "upload",
      description: "Upload videos, and earn subscribers!",
      category: "Youtube",
      aliases: ["up"] 
    })
  }
  
  async run(client, message, args) {
    let checkIfUserIsSignedUp = client.db.get(`yt_${message.author.id}`);
    if(!checkIfUserIsSignedUp) {  
      return message.channel.send(`${client.no} | You haven't registered on youtube simulator yet! Please run \`${client.prefix}register\` to create one!`)
    } else {
      let banCheck = client.db2.get(`ban_${message.author.id}`);
      if(banCheck) return message.channel.send(`${client.no} | You have been banned from using **${client.user.username}**. Please contact an admin for more details.`)
      let cooldown = 1.8e+7;
      let iscooldown = client.db2.get(`sus_${message.author.id}`);
      if(iscooldown !== null && cooldown - (Date.now() - iscooldown) > 0) return message.channel.send(`${client.no} | Your channel is currently suspended. Please wait **${moment.duration(cooldown - (Date.now() - iscooldown)).format("h [hours], m [minutes and] s [seconds]")}** before you can upload any videos.`)
      
    let inventory = checkIfUserIsSignedUp.inventory;
    if(inventory) {
      var totalCostPerVideo = 0;
      Object.values(inventory).forEach(i => {
      totalCostPerVideo += i.costPerVideo;    
    });
    }
      let balance = checkIfUserIsSignedUp.balance.wallet;
      if(totalCostPerVideo > balance) return message.channel.send(`${client.no} | You don't have enough money in your **Wallet** to make a video at the moment. Please check your **Cost Per Upload**, and sell either your **Video Editor** or **Thumbnail Designer**!`)
      uploadManager.run(client, message, args, totalCostPerVideo);
    }    
  }
  
}


module.exports = Upload;