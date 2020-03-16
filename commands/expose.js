let replies = require('../replies/expose.js');
let Discord = require('discord.js')
let moment = require('moment')
require('moment-duration-format');
module.exports = {
  name: "expose",
  description: "Exposes other youtubers...",
  aliases: ["ex"],
  run: async (client, message, args, janix) => {
    let user = message.mentions.users.first();
    if(!user) return message.channel.send(`${janix.no} | Please provide a valid user!`)
    client.db.ensure(`yt_${message.author.id}`, {
    exposecooldown: 0
  });
  let timeout = 10000000;
  let time = client.db.get(`yt_${message.author.id}`, "exposecooldown");
if(time !== null && timeout - (Date.now() - time) > 0) {  
   return message.channel.send(`${janix.no} | You are on cooldown! Please come back in **${moment.duration(timeout - (Date.now() - time)).format("h [hours] m [mins] s [secs]")}**`)  
}
    let hasxp = await client.db.get(`exposed_${user.id + message.author.id}`)
    if(hasxp) return message.channel.send(`${janix.no} | You already exposed the poor guy! Leave him alone...`);
    
    let mysubs = client.db.get(`yt_${message.author.id}`, "yt.subscribers")
    if(mysubs < 1000) return message.channel.send(`${janix.no} | You need at least **1,000** subscribers to expose somebody.`)
    let usersubs = client.db.get(`yt_${user.id}`, "yt.subscribers")
    if(usersubs < 1000) return message.channel.send(`${janix.no} | Please expose someone that has more than **1,000** subscribers!`)
    let chance = Math.floor(Math.random() * 100)
    let fail;
    if(usersubs > mysubs) fail = 75;
    if(mysubs > usersubs) fail = 25;
    
    if(chance > fail) {
      let arr1 = replies.expose(user.username);
      let a = arr1[Math.floor(Math.random() * arr1.length)]
 message.channel.send(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}`)
      ).then((m)=>{
        setTimeout(()=>{
          let msg2 = replies.response(user.username);
          let b = msg2[Math.floor(Math.random()*msg2.length)]
          m.edit(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}\n- ${b}`)
      ).then(()=>{
        setTimeout(()=>{
          let msg3 = replies.sucsess(user.username);
          let c = msg3[Math.floor(Math.random() * msg3.length)]
          m.edit(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}\n- ${b}\n**- ${c}**`)).then(()=>{
            setTimeout(()=>{
              let toAdd = client.db.get(`yt_${message.author.id}`, "yt.subscribers") 
              let amt = Math.round(client.db.get(`yt_${user.id}`, "yt.subscribers") / 9.5)
              toAdd += amt
              let toSub = client.db.get(`yt_${user.id}`, "yt.subscribers")
              let amt2 = Math.round(client.db.get(`yt_${user.id}`, "yt.subscribers") / 9.5)
              toSub -= amt2
              client.db.set(`yt_${message.author.id}`, toAdd, "yt.subscribers")
              client.db.set(`yt_${user.id}`, toSub, "yt.subscribers")
              client.db.set(`yt_${message.author.id}`, Date.now(), "exposecooldown")
              client.db.set(`exposed_${user.id + message.author.id}`, true)
              m.edit(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}\n- ${b}\n**- ${c}**\n\n**You sucsessfully exposed ${user.username}!**\nYou earned: ${amt} subscribers\n${user.username} lost: ${amt2} subscribers`))
            },2000) 
          })
        }, 2000)
      })
        },2000)
      })
    } else {
  let arr1 = replies.expose(user.username);
let a = arr1[Math.floor(Math.random() * arr1.length)]
      message.channel.send(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}`)
      ).then((m)=>{
        setTimeout(()=>{
          let msg2 = replies.response(user.username);
          let b = msg2[Math.floor(Math.random()*msg2.length)]
          m.edit(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}\n- ${b}`)
      ).then(()=>{
        setTimeout(()=>{
          let msg3 = replies.fail(user.username);
          let c = msg3[Math.floor(Math.random() * msg3.length)]
          m.edit(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}\n- ${b}\n**- ${c}**`)).then(()=>{
            setTimeout(()=>{
              let toAdd = client.db.get(`yt_${user.id}`, "yt.subscribers") 
              let amt = Math.round(client.db.get(`yt_${user.id}`, "yt.subscribers") / 9.5)
              toAdd += amt
              let toSub = client.db.get(`yt_${message.author.id}`, "yt.subscribers")
              let amt2 = Math.round(client.db.get(`yt_${message.author.id}`, "yt.subscribers") / 9.5)
              toSub -= amt2
              client.db.set(`yt_${user.id}`, toAdd, "yt.subscribers")
              client.db.set(`yt_${message.author.id}`, toSub, "yt.subscribers")
              client.db.set(`yt_${message.author.id}`, Date.now(), "exposecooldown")
              m.edit(new Discord.RichEmbed()
      .setTitle(`Exposing ${user.username}`)
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`**Expose Log**\n- ${a}\n- ${b}\n**- ${c}**\n\n**You failed to expose ${user.username}!**\nYou lost: ${amt2} subscribers\n${user.username} earned: ${amt} subscribers`))
            },2000) 
          })
        }, 2000)
      })
        },2000)
      })
      
    }
  }
}