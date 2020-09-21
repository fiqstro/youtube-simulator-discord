let options = require('./options.js')
let { MessageEmbed } = require('discord.js')
let moment = require('moment')
require('moment-duration-format');

module.exports.run = async function(client, message, args) {
  
  let inp = parseInt(args[0]);
  let options = client.subopt;
  let item = options.get(inp);
  if(!item) {
    let embed = new MessageEmbed()
    .setTitle("Availible Offers - Sub Bot")
    .setDescription(`To buy subs, do ${client.prefix}subbot <option-id>\nThere is a chance that your channel might get suspended from buying subscribers!`)
    .setColor("RED")
    .setTimestamp();
    
    options.forEach(i => {
      embed.addField(`${i.name}`, `Cost: $${i.cost.toLocaleString()}\nBan Rate: ${i.banrate}%\nID:\`${i.id}\``, true)
    })
    
    return message.channel.send(embed);
  } else {
    let banrate = item.banrate;
    let chance = Math.floor(Math.random() * 100);
    let subscribers = item.amount;
    if(chance > banrate) {
    let balance = client.db.get(`yt_${message.author.id}`, "balance.bank");
    if(item.cost > balance) return message.channel.send(`${client.no} | You don't have enough money in your **Bank Account** to buy this item!`);
    
    client.db.math(`yt_${message.author.id}`, "+", subscribers, "channel.subscribers")
    client.db.math(`yt_${message.author.id}`, "-", item.cost, "balance.bank")
      
    message.channel.send(`${client.yes} | You sucsessfully bought **${subscribers.toLocaleString()} subscribers!**`)
      
    } else {  
      client.db2.set(`sus_${message.author.id}`, Date.now())
      let cooldown = 1.8e+7;
      let iscooldown = client.db2.get(`sus_${message.author.id}`);
      return message.channel.send(`${client.no} | You have been caught by Youtube and your channel has been temporarily suspended! Your channel will be availible after **${moment.duration(cooldown - (Date.now() - iscooldown)).format("h [hours], m [minutes and] s [seconds]")}**.`)     
    }
  }

}