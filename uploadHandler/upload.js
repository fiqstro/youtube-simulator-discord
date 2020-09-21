let comments1 = require('../replies/comments.js');
const Discord = require('discord.js')
module.exports.run = (client, message, args, tax) => {
  
  let construct = {
    title: null,
    topic: null,
    comments: null,
    ismonetized: true,
    subs: null,
    revenue: null,
    likes: null,
    dislikes: null,
    views: null,
    monetized: null,
    tax: null
  }
  
  let videoTypes = client.db.get(`yt_${message.author.id}`, "videoTypes")
  const filter = m => m.author.id === message.author.id;
  message.channel.send(`Ok, so what is your video gonna be about? Choose wisely...
${videoTypes.map(a => `\`${a.name}\``).join("\n")}`).then(()=>{
  message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]}).then(m => { 
    let msg = m.first().content.toLowerCase();
  if(videoTypes.some(v => msg.includes(v.name.toLowerCase() || v.id))) {
      let vContent = videoTypes.find(a => msg.includes(a.name.toLowerCase() || a.id))
      construct.topic = vContent.name;
      message.channel.send(`Alright, so you are uploading a video about ${construct.topic}, what is your video title?`).then(()=>{
        message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]}).then(m => {
          let msg = m.first().content.toLowerCase();
          construct.title = msg;
  message.channel.send("Processing...").then(b => { 
       
async function runVideo() {
        
let filtert = [
  "fuck",
  "shit",
  "dick",
  "cunt",
  "bitch",
  "ass",
  "cock",
  "penis",
  "vagina",
  "nigga",
  "nigger",
  "glans",
  "foreskin",
  "nipples",
  "boobs",
  "blowjob",
  "negro",
  "ching",
  "chong",
  "anal",
  "oral",
  "f*ck"
];
          if(filtert.some(a => msg.includes(a))) construct.ismonetized = false;
          let u = client.db.get(`yt_${message.author.id}`, "inventory.thumbnail designer.viewBoost");
          let v = client.db.get(`yt_${message.author.id}`, "inventory.video editor.viewBoost");
          let views = (Math.round((Math.floor(Math.random() * 4) + 1) * (client.db.get(`yt_${message.author.id}`, "channel.subscribers") + 1) * (vContent.likes))) * (1 + ((u - 1) || 0) + ((v - 1) || 0))
          let likes = (Math.sqrt(views)) * (vContent.likes)
          let dislikes = (Math.sqrt(views) / 2) * (vContent.dislikes);
          let revenue = (construct.ismonetized) ? Math.cbrt(views) : 0;
          let subsEarned = likes / 2;
          let demonetizedMsg = (construct.ismonetized) ? "Monetized" : "Demonetized - Inappropriate Title";
          let channelName = client.db.get(`yt_${message.author.id}`, "channel.name")
          let comments = [];       
          for(var i = 0; i < (Math.floor(Math.cbrt(likes))); i++) {
            comments.push(`<:happyfys:682921824404766795> **${client.users.cache.random().username}**: ${comments1.likes(channelName, construct.topic)} | ${Math.floor(likes / 3.5)} 👍`)
          }     
          for(var i = 0; i < (Math.floor(Math.cbrt(dislikes))); i++) {
            comments.push(`<:sadfys:682921471894355968> **${client.users.cache.random().username}**: ${comments1.dislikes(channelName, construct.topic)} | ${Math.floor(dislikes / 3.5)} 👎`)
          }  
          comments.shuffle();
          if(comments.length > 5) comments.length = 5;
          construct.monetized = demonetizedMsg;
          construct.revenue = Number(revenue.toFixed(2));
          construct.likes = Math.floor(likes);
          construct.dislikes = Math.floor(dislikes);
          construct.views = Math.floor(views);
          construct.subs = Math.round(subsEarned)
          construct.tax = tax;
          construct.comments = comments.shuffle();
  
          client.db.math(`yt_${message.author.id}`, "+", construct.revenue, "channel.revenue")
          client.db.math(`yt_${message.author.id}`, "+", Number(construct.revenue), "balance.bank")
          client.db.math(`yt_${message.author.id}`, "+", construct.likes, "channel.likes")
          client.db.math(`yt_${message.author.id}`, "+", construct.dislikes, "channel.dislikes")
          client.db.math(`yt_${message.author.id}`, "+", construct.views, "channel.views")
          client.db.math(`yt_${message.author.id}`, "+", construct.subs, "channel.subscribers")
          client.db.math(`yt_${message.author.id}`, "-", construct.tax, "balance.wallet")
  
          message.channel.send(
            new Discord.MessageEmbed()
            .setTitle(`${construct.title}`)
            .setThumbnail(vContent.thumbnail)
            .setColor("RED")
            .addField("Author", channelName)
            .addField("Topic", vContent.name)
            .addField("Views", construct.views)
            .addField("Subscribers Earned", construct.subs)
            .addField("Is Monetized", construct.monetized)
            .addField("Revenue", "$" + construct.revenue)
            .addField("Tax", "$" + construct.tax)
            .addField("Comments", comments.shuffle().map(a => a).join("\n"))
            .setFooter(`${construct.likes} 👍 | ${construct.dislikes} 👎`)
          )
    }
    
    
    let progress = 0;
   let max = 100;
    let netBoostOne = client.db.get(`yt_${message.author.id}`,"inventory.ultraz wifi router.uploadBoost") || 1;
    let netBoostTwo = client.db.get(`yt_${message.author.id}`,"inventory.gaming pc.uploadBoost") || 1;
    
    let co = setInterval(()=>{
        progress = progress + ((Math.floor(Math.random() * 14) + 1) * (netBoostOne * netBoostTwo));
        if(progress >= max) {
            progress = 100;
          b.edit(
           new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Uploading...`)
        .addField(`${client.createBar(progress, max, 25).percentage}`, client.createBar(progress, max, 25).bar)
          )
          setTimeout(()=>{
            b.delete();
            clearInterval(co);
            runVideo();
          },2000)
        }
      
        b.edit(
        new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Uploading...`)
        .addField(`${client.createBar(progress, max, 25).percentage}`, client.createBar(progress, max, 25).bar)          
        )
          }, 2000)
          })
        })
      })
    
    } else {
      return message.channel.send(`${client.no} | Not a valid video topic.`)
    }
  }).catch(e => {
      console.log(e)
      return message.channel.send(`${client.no} | No response, upload canceled.`)
  })
  })
}

