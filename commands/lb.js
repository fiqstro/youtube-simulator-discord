const Discord = require('discord.js')

module.exports = {
name: "lb",
aliases: ["leaderboard"],
description: "Shows the users with the highest statistics.",
cooldown: 3,
run: async (client, message, args) => {
  if(!args.length) return message.channel.send(`${message.author.toString()}, please do one of the following:
yt.lb subs | yt.lb views | yt.lb likes`)
  switch(args[0].toLowerCase()) {
    case 'subs':
      
    let shit = client.db.fetchEverything().array().filter(t=>t.yt && client.db.get(`yt_${t.id}`)).sort((a, b) => b.yt.subscribers > a.yt.subscribers || -(b.yt.subscribers < a.yt.subscribers));  
    let lb = shit
    let abc = shit.map(a => a)
      let txt = ""
      let index = 1;
      let index22 = 1;
      let currentrank = `\`Your rank\`\n**No Rank!**`;
      
     lb.forEach(a => {
       let p = (client.db.get(`yt_${a.id}`, "prestige.icon")) ? client.db.get(`yt_${a.id}`, "prestige.icon") : ""
       let aw = (client.db.get(`yt_${a.id}`, "awards.current")) ? client.db.get(`yt_${a.id}`, "awards.current") : ""
       if(!a.yt.subscribers) return;
       if(index <= 10) {
        txt += `**${index++}. ${p} ${aw}${a.tag}** - ${Math.floor(a.yt.subscribers).toLocaleString()} subscribers\n`;
       }
       if(a.id === message.author.id) {
       currentrank = `\`Your rank\`\n**${lb.indexOf(a)}. ${p} ${aw} ${a.tag}** - ${Math.floor(a.yt.subscribers).toLocaleString()} subscribers` 
       }//oki
       })
    const embed = new Discord.RichEmbed()
    .setTitle("Leaderboard - Subscribers")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription(txt + "\n\n" + currentrank)
    .setColor("RED");
  return message.channel.send({embed});
    break;
    case 'views': 
    let cp = client.db.get(`yt_${message.author.id}`, "prestige.name")
    let shit2 = client.db.fetchEverything().array().filter(t=>t.yt && client.db.get(`yt_${t.id}`)).sort((a, b) => b.yt.totalviews > a.yt.totalviews || -(b.yt.totalviews < a.yt.totalviews));  
    let lb2 = shit2;
      let txt2 = ""
      let index2 = 1;
      let currentrank2 = ""
     lb2.forEach(a => {
       let p = (client.db.get(`yt_${a.id}`, "prestige.icon")) ? client.db.get(`yt_${a.id}`, "prestige.icon") : ""
       let aw = (client.db.get(`yt_${a.id}`, "awards.current")) ? client.db.get(`yt_${a.id}`, "awards.current") : ""
       if(a.yt.totalviews == 0) return;
      if(index2 <= 10) {
        txt2 += `**${index2++}. ${p} ${aw}${a.tag}** - ${Math.floor(a.yt.totalviews).toLocaleString()} views\n`
      }
      if(a.id === message.author.id) {
       currentrank2 = `\`Your rank\`\n**${index2 - 1}. ${p} ${aw} ${a.tag}** - ${Math.floor(a.yt.totalviews).toLocaleString()} views`
      } 
     })
  const embed2 = new Discord.RichEmbed()
    .setTitle("Leaderboard - Views")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription(txt2 + "\n\n" + currentrank2)
    .setColor("RED");
  return message.channel.send(embed2)
    break;
    case 'likes': 
      let shit3 = client.db.fetchEverything().array().filter(t=>t.yt).sort((a, b) => b.yt.likes > a.yt.likes || -(b.yt.likes < a.yt.likes));  
    let lb3 = shit3.splice(0, 10)
      let txt3 = ""
      let index3 = 1;
      let currentrank3 = ""
     lb3.forEach(a => {
       let p = (client.db.get(`yt_${a.id}`, "prestige.icon")) ? client.db.get(`yt_${a.id}`, "prestige.icon") : ""
       let aw = (client.db.get(`yt_${a.id}`, "awards.current")) ? client.db.get(`yt_${a.id}`, "awards.current") : ""
       if(a.yt.totalviews == 0) return;
      if(index3 <= 10) {
        txt3 += `**${index3++}. ${p} ${aw}${a.tag}** - ${Math.floor(a.yt.likes).toLocaleString()} likes\n`
      }
      if(a.id === message.author.id) {
       currentrank3 = `\`Your rank\`\n**${index3 - 1}. ${p} ${aw} ${a.tag}** - ${Math.floor(a.yt.likes).toLocaleString()} likes`
      } 
     })
  const embed3 = new Discord.RichEmbed()
    .setTitle("Leaderboard - Likes")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription(txt3 + "\n\n" + currentrank3)
    .setColor("RED");
  return message.channel.send(embed3)
    break;
    default:
      return message.channel.send(`${message.author.toString()}, please do one of the following:
yt.lb subs | yt.lb views | yt.lb likes`)
  }
  
}}