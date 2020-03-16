let moment = require('moment')
require('moment-duration-format')

module.exports = {
  name: "rob",
  description: "Steals some money from another user. If you fail, you lose subscribers",
  aliases: ["steal"],
  run: async (client, message, args, janix) => {
    let timeout = 1000000;
    let time = client.db.get(`rob_${message.author.id}`)
    if(time !== null && timeout - (Date.now() - time) > 0) {  
   return message.channel.send(`${janix.no} | You are on cooldown! Please come back in **${moment.duration(timeout - (Date.now() - time)).format("m [mins] s [secs]")}**`)  
    }
    let user = message.mentions.users.first();
    if(!user) return message.channel.send(`${janix.no} | Please give me a valid user to rob!`);
    
    let check = client.db.get(`yt_${message.author.id}`, "bal.wallet");
    let check2 = client.db.get(`yt_${user.id}`, "bal.wallet");
    
    if(check < 10) {
      return message.channel.send(`${janix.no} | You are too poor to rob!`)
    }
    
    if(check2 < 10) {
      return message.channel.send(`${janix.no} | That user is too poor for you to rob!`)
    }
    
    let chance = Math.floor(Math.random() * 100);
    if(chance < 25) {
      let amt = Math.round(client.db.get(`yt_${message.author.id}`, "yt.subscribers") * 0.005)
      let newbal = client.db.get(`yt_${message.author.id}`, "yt.subscribers");
      newbal =- amt;
      client.db.set(`yt_${message.author.id}`, newbal, "yt.subscribers")
      message.channel.send(`${janix.no} | Oh no you were caught! Your fans lost their trust in you and you lost ${amt} subscribers!`)
      client.db.set(`rob_${message.author.id}`, Date.now())
    } else {
      let amt = Math.round(client.db.get(`yt_${user.id}`, "bal.wallet") * 0.01)
      let newbal2 = client.db.get(`yt_${user.id}`, "bal.wallet")
      let newbal = client.db.get(`yt_${message.author.id}`, "bal.wallet");
      newbal =+ amt;
      newbal2 =- amt;
      client.db.set(`yt_${message.author.id}`, newbal, "bal.wallet")
      client.db.set(`yt_${user.id}`, newbal2, "bal.wallet")
      message.channel.send(`${janix.yes} | You sucsessfully robbed ${amt.toFixed(2)}$ from ${user.username}!`)
      client.db.set(`rob_${message.author.id}`, Date.now())
    }
  } 
}