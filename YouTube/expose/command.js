let log = require("./text.js");
let Discord = require('discord.js');
const moment = require('moment')

module.exports.run = async function(client, message, args) {
  let user = message.mentions.users.first();
  if(!user || user === message.author) return message.channel.send(`${client.no} | Please give me an actual user!`)
  let exposed = client.db.get(`yt_${user.id}`);
  let exposer = client.db.get(`yt_${message.author.id}`)
  if(!exposed) return message.channel.send(`${client.no} | This user doesn't have a profile!`)
  if(exposed.channel.subscribers < 10000) return message.channel.send(`${client.no} | You cannot expose users under **10,000** subscribers!`);
  if(exposer.channel.subscribers > 10000) return message.channel.send(`${client.no} | You need **10,000** subscribers to expose somebody.`)
  let checkIfAlreadyExposed = client.db.get(`alreadyexposed_${message.author.id}=>${user.id}`);
  if(checkIfAlreadyExposed) return message.channel.send(`${client.no} | You already exposed this user!`)  
  
  let options = require('./options.js').getOpt()
  const filter = m => m.author.id === message.author.id;
  
  message.channel.send(`What do you want to expose this user for?\n1. \`${options.first.optionName}\`\n2. \`${options.second.optionName}\`\n3. \`${options.third.optionName}\``).then(() => {
    message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
      let msg = collected.first();
      if(options.toArray.some(v => msg.content.toLowerCase().includes(v.optionName.toLowerCase() || v.id))) {     
        let x = options.toArray.find(a => msg.content.includes(a.optionName.toLowerCase() || a.id))
          let firstText = log.first(exposer.channel.name, exposed.channel.name, x.optionName)
          let embedFormat = new Discord.MessageEmbed()
          .setTitle(`${exposer.channel.name} vs ${exposed.channel.name}!`)
          .setDescription(`- ${firstText}`)
          .setColor("RED")
          
        message.channel.send(embedFormat).then(y => {
          setTimeout(() => {
            let secondText = log.response(exposer.channel.name, exposed.channel.name)
            embedFormat.setDescription(`- ${firstText}\n - ${secondText}`)
            y.edit(embedFormat);
            
              function determineWinner() {
                const mysubscribers = exposer.channel.subscribers;
                const exposedsubscribers = exposed.channel.subscribers;
                
                let probability = 50;
                if(exposedsubscribers > mysubscribers) probability += 5;
                
                let result = Math.floor(Math.random() * 100);
                if(result >= probability) {
                  return true;
                } else {
                  return false;
                };
              }
            
              let res = determineWinner();
            
            function giveReward(winner, loser, m) {
              setTimeout(()=>{
              m.delete();
              let reward = Math.floor(loser.channel.subscribers * x.subLoseRate);
              message.channel.send(`**${winner.channel.name}** has stolen **${reward.toLocaleString()}** subscribers from **${loser.channel.name}!**`)
              client.db.math(`yt_${winner.id}`, "+", reward, "channel.subscribers");
              client.db.math(`yt_${loser.id}`, "-", reward, "channel.subscribers")
              client.db.set(`alreadyexposed_${winner.id}=>${loser.id}`, true);
              },3000)
            }
            
              if(res === true) {
                
                setTimeout(()=> {
                  let thirdTextWin = log.result(exposer.channel.name, exposed.channel.name)
                  embedFormat.setDescription(`- ${firstText}\n - ${secondText}\n - ${thirdTextWin}`)
                  y.edit(embedFormat);
                  giveReward(exposer, exposed, y)
                }, 2000)
                
              } else {
                
                setTimeout(()=> {
                  let thirdTextLost = log.result(exposed.channel.name, exposer.channel.name)
                  embedFormat.setDescription(`- ${firstText}\n - ${secondText}\n - ${thirdTextLost}`)
                  y.edit(embedFormat);
                  giveReward(exposer, exposed, y)
                }, 2000)

              }
            
              
            
          }, 2000)
        })
        
      } else {
        return message.channel.send(`${client.no} | Not a valid option.`)
      }
  })
})  
}