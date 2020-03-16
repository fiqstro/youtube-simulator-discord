let moment = require("moment")
require('moment-duration-format')

module.exports = {
name: "work",
description: "Work and earn money!",
aliases: [],
run: async (client, message, args, janix) => {
  client.db.ensure(`yt_${message.author.id}`, {
    workcooldown: 0
  });
  let timeout = 900000;
  let time = client.db.get(`yt_${message.author.id}`, "workcooldown");
if(time !== null && timeout - (Date.now() - time) > 0) {  
   return message.channel.send(`${janix.no} | You are on cooldown! Please come back in **${moment.duration(timeout - (Date.now() - time)).format("m [mins] s [secs]")}**`)  
  } else {
  let amount = Number((Math.random() * 24 + 1).toFixed(2))  
  var work = [
"Developer",
"Lawyer",
"Doctor",
"Construction Worker",
"Designer",
"Event Hostess",
"Prostitute",
"MC",
"Street Preformer",
"Cosplayer",
"Animator",
"Troll",
"Cashier",
"Waitress",
"Waiter",
"Office Clerk",
"Salesperson"
]
  var reply1 = work[Math.floor(Math.random() * work.length)]
  message.channel.send(`You worked as a **${reply1}** and earned **${amount}$**`)
  client.db.set(`yt_${message.author.id}`, Date.now(), "workcooldown");
  client.addmoney(message.author.id, amount)
  }  
  
}}