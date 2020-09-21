let categories = require('../YouTube/categories.js')
let Discord = require('discord.js')
module.exports.setup = async function(client, message, args) {
 let userInfo = {
   username: null,
   tag: message.author.tag,
   id: message.author.id,
   category: {
     name: null,
     id: null
   }
 }
 let filter = m => m.author.id === message.author.id 
 let filter2 = m => m.author.id === message.author.id 
 message.channel.send(`Alright! Seems like you are a new guy. Eh? Before we start, let me know a little bit about you. What is your channel name?`)
 message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then(c => {
   let msg = c.first().content;
   let abab = msg.substr(0, 1)
   if(abab.match(/([A-Za-z])\w+/g)) {
     return message.channel.send(`${client.no} | Your channel name must start with an alphabetical letter!`)
   }
   if(msg.length > 20) return message.channel.send(`${client.no} | Your channel name is too long, the maximum amount of character that your channel name can me is 20!`)
   userInfo.username = msg;
   message.channel.send(`Alright, your channel name is ${userInfo.username}, and you want to be a youtuber. What do you want your channel to be about?
Here are some availible topics:
${categories.map(a => `**${a.name}**\n${a.description}\n`).join("")}
You can choose any of these!`).then(()=>{
   message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then(m => {  
     let msg2 = m.first().content.toLowerCase()
      categories.forEach(a => {
        if(msg2 === (a.name.toLowerCase() || a.id)) {
          userInfo.category.name = a.name;
          userInfo.category.id = a.id;         
          message.channel.send(
            new Discord.MessageEmbed()
            .setTitle("Is this you?")
            .setDescription("Send `yes` to continue, or send `no` to start over.")
            .setColor("RED")
            .addField("Channel Name", userInfo.username)
            .addField("Channel Topic", userInfo.category.name)
          ).then(()=>{
            message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then(ms => {
              let msg = ms.first().content.toLowerCase();
              switch(msg) {
                case 'yes':      
                    let defaultInventory = require(`../YouTube/default/${userInfo.category.id}`)
                    client.db.set(`yt_${message.author.id}`, {  
                      name: message.author.username,
                      tag: message.author.tag,
                      id: message.author.id,
                      age: userInfo.age,
                      category: {
                        name: userInfo.category.name,
                        id: userInfo.category.id 
                      },
                      channel: {
                        name: userInfo.username,
                        subscribers: 0,
                        likes: 0,
                        dislikes: 0,
                        views: 0,
                        exposed: 0,
                        revenue: 0
                      },
                      balance: {
                        wallet: 0,
                        bank: 50
                      },
                      videoTypes: defaultInventory,
                      xp: 0,
                      level: 1,
                      inventory: null,
                      job: null,
                      badges: []
                    })  
                    message.channel.send(`${client.yes} | Profile created! You can start uploading now :)`)
                  break;
                case 'no': 
                    return message.channel.send(`${client.no} | Alright, i guess you have to start over :(`)
                  break;
                default:
                  return message.channel.send(`${client.no} | Not a valid response.`)
              }
            }).catch(e => {
              console.log(e)
              return message.channel.send(`${client.no} | No response, i guess you're not intrested...`)
            })
          })
        }
      })
   }).catch(e => {
     console.log(e)
     return message.channel.send(`${client.no} | No response, i guess you're not intrested...`)
   })
   })
 }).catch(e => {
   console.log(e)
   return message.channel.send(`${client.no} | No response, i guess you're not intrested...`)
 });
}