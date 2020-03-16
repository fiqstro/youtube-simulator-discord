const Discord = require('discord.js')
const replies = require('../replies/duelActions.js')
let bar = "▅"
class dramaManager {
  
  constructor(client, message) {
    this.client = client;
    this.message = message;
  }
  
  showBar(shifted, total) {
    let num = Math.round((shifted / total) * 15);
    let bar = `${shifted.toLocaleString()}/${total.toLocaleString()}\n[${`▅`.repeat(num)}](https://discord.gg/u2xhq3c)${`▅`.repeat(15 - num)}`
    return bar;
  }

 shoBar(health, max) {
  let kk = health;
  let kkk = max;
  health = Math.floor(health / 10);
  max = Math.floor(max / 10 - health);
  return `${kk} / ${kkk} \n[${bar.repeat(
    health
  )}](https://fashishi.gq)${bar.repeat(max)}`;
}
  
  async drama(user1, user2, m) {
    let client = this.client;
    let message = this.message;
    user1.mul = Math.floor(client.db.get(`yt_${user1.id}`, "yt.subscribers") * 0.0001) || 1;
    user2.mul = Math.floor(client.db.get(`yt_${user2.id}`, "yt.subscribers") * 0.0001) || 1;
    user1.fmul = Math.floor(client.db.get(`yt_${user1.id}`, "yt.subscribers") * 0.001) || 1;
    user2.fmul = Math.floor(client.db.get(`yt_${user2.id}`, "yt.subscribers") * 0.001) || 1;
    
    user1.health = 100 * user1.mul;
    user2.health = 100 * user2.mul;
    user1.max = 100 * user1.mul;
    user2.max = 100 * user2.mul;
    let turn = true;
 
   m.edit(
          new Discord.RichEmbed()
          .setTitle(`Drama Battle - ${user1.username} vs ${user2.username}`)
          .setDescription("TIP: Your health, and the charisma damage you dealt are based on how many subscribers you have.")
          .addField(user1.username, this.showBar(user1.health, user1.max))
          .setColor("RED")
          .addField(user2.username, this.showBar(user2.health, user2.max))
          .setFooter(`Battle will start in 3 seconds.`) 
    )
    setTimeout(()=>{
  let x = setInterval(()=>{
    if(user1.health > 0 && user2.health > 0) {
          if(turn == true) {
      let damage = Math.floor(Math.random() * 24) + 1 * user1.fmul;
      user2.health -= damage;
      if(user2.health < 25) {
        user2.health = 0;
      }
      m.edit(new Discord.RichEmbed()
        .setTitle(`Drama Battle - ${user1.username} vs ${user2.username}`)
          .setDescription(`${replies.action(user1.username, user2.username, damage)}`)
          .addField(user1.username, this.showBar(user1.health, user1.max))
          .setColor("RED")
          .addField(user2.username, this.showBar(user2.health, user2.max))
          .setFooter(`${client.user.username} - Fight`)     
            )
      turn = false;
    } else if(turn == false) {
      let damage = Math.floor(Math.random() * 24) + 1 * user2.fmul;
      user1.health -= damage;
      if(user1.health < 25) {
        user1.health = 0;
      }
      m.edit(new Discord.RichEmbed()
        .setTitle(`Drama Battle - ${user1.username} vs ${user2.username}`)
          .setDescription(`${replies.action(user2.username, user1.username, damage)}`)
          .addField(user1.username, this.showBar(user1.health, user1.max))
          .setColor("RED")
          .addField(user2.username, this.showBar(user2.health, user2.max))
          .setFooter(`${client.user.username} - Fight`)     
            )
      turn = true;
     }
    } else {
    if(user2.health < user1.health) {
       m.delete()
      message.channel.send(new Discord.RichEmbed()
             .setTitle(`Drama Battle - ${user1.username} vs ${user2.username}`)
             .setDescription(`${user1.username} has won the drama!\n\n${user1.username} earned: ${user1.max.toLocaleString()} subscribers!\n${user2.username} lost: ${user2.max.toLocaleString()} subscribers!`)
             .setColor("RED")
             .setFooter(`${client.user.username} - Drama Battle`))
      let a = client.db.get(`yt_${user1.id}`, "yt.subscribers")
      a += user1.max;
      let b = client.db.get(`yt_${user2.id}`, "yt.subscribers")
      b -= user2.max;
      client.db.set(`yt_${user2.id}`, b, "yt.subscribers");
      client.db.set(`yt_${user1.id}`, a, "yt.subscribers");
      clearInterval(x);
    } else if(user1.health < user2.health) {
      m.delete()
      message.channel.send(new Discord.RichEmbed()
             .setTitle(`Drama Battle - ${user1.username} vs ${user2.username}`)
             .setDescription(`${user2.username} has won the drama!\n\n${user2.username} earned: ${user2.max.toLocaleString()} subscribers!\n${user1.username} lost: ${user1.max.toLocaleString()} subscribers!`)
             .setColor("RED")
             .setFooter(`${client.user.username} - Drama Battle`))
      let a = client.db.get(`yt_${user2.id}`, "yt.subscribers")
      a += user2.max;
      let b = client.db.get(`yt_${user1.id}`, "yt.subscribers")
      b -= user1.max;
      client.db.set(`yt_${user1.id}`, b, "yt.subscribers");
      client.db.set(`yt_${user2.id}`, a, "yt.subscribers");
      clearInterval(x);
    }
    }
  }, 2000)
  }, 3000)
  }       
}

module.exports = dramaManager;