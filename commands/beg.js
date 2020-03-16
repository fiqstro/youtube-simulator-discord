let moment = require('moment');
require('moment-duration-format');
let replies = require('../replies/beg.js')
module.exports = {
  name: "beg",
  description: 'Beg, and earn money. lol',
  aliases: ["bg"],
  run: async (client, message, args, janix) => {
  client.db.ensure(`yt_${message.author.id}`, {
    begcooldown: 0
  });

  let timeout = 15000;
  let amount = Number((Math.random() * 5).toFixed(2))
  let u = client.users.array().slice(0,10000).map(a => a.username)
  let user = u[Math.floor(Math.random() * u.length)]
  let failmsg = replies.begF[Math.floor(Math.random() * replies.begF.length)]
  let winmsg = replies.begS[Math.floor(Math.random() * replies.begS.length)]
  let time = client.db.get(`yt_${message.author.id}`, "begcooldown");
if(time !== null && timeout - (Date.now() - time) > 0) {  
   return message.channel.send(`${janix.no} | You are on cooldown! Please come back in **${moment.duration(timeout - (Date.now() - time)).format("m [mins] s [secs]")}**`)  
  } else {
   let chance = Math.floor(Math.random() * 15)
   if(chance < 5) {
     return message.channel.send(`**${user}**: ${failmsg}`)
   } else {
     client.addmoney(message.author.id, amount)
     message.channel.send(`**${user}**: ${winmsg} **${amount}$**`)
     client.db.set(`yt_${message.author.id}`, Date.now(), "begcooldown")
   }
    
  }
}}