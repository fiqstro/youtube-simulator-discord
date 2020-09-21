const Discord = require('discord.js')
const jobs = require('./jobs');
const moment = require('moment');
const { deleteItem } = require("../YouTube/shop/util.js");
require('moment-duration-format')

module.exports.run = (client, message, args) => {
  let user = client.db.get(`yt_${message.author.id}`);
  if(!args.length) {
  let job = client.db.get(`yt_${message.author.id}`, "job");
    if(job == undefined) {
      return message.channel.send(`${client.no} | You don't have a job yet! Please do \`${client.prefix}work jobs\` to see a list of jobs!`)
    } else {
      let cooldown = job.cooldown;
      let workBoost = client.db.get(`yt_${message.author.id}`, "inventory.energy drink.workBoost") || 1;
      let reward = job.salary;
      let iscooldown = client.db2.get(`workt_${message.author.id}`);
      if(iscooldown !== null && cooldown - (Date.now() - iscooldown) > 0) {
        return message.channel.send(`${client.no} | You're too tired to work! Please wait **${moment.duration(cooldown - (Date.now() - iscooldown)).format("h [hours], m [minutes and] s [seconds]")}**!`)
      } else {
        let workReplies = job.jobReplies;
        let progress = 0;
        let max = 100;
        message.channel.send(new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Working as **${job.name}**`)
        .addField(`${workReplies.random()} ${client.createBar(progress, max, 25).percentage}`, client.createBar(progress, max, 25).bar)
        ).then(m => {
          let i = setInterval(()=>{
        progress = progress + (Math.floor(Math.random() * 19) + 1) * workBoost;
        if(progress >= max) {
            progress = 100;
          m.edit(
          new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Working as **${job.name}**`)
          .addField(`${workReplies.random()} ${client.createBar(progress, max, 25).percentage}`, client.createBar(progress, max, 25).bar)
          )
          setTimeout(()=>{
            m.delete();
            let messageIfUserHasEnergyDrink = (workBoost !== 1) ? `And you also used an <:ytsmenergydrink:703838037171372052> **Energy Drink** while working!` : "";
            client.db.math(`yt_${message.author.id}`, "+", job.salary, "balance.wallet");
            // yes
            if(workBoost !== 1) {
              let item = client.db.get(`yt_${message.author.id}`, "inventory.energy drink");
              deleteItem(item, client, message.author);
            };
            message.channel.send(`${client.yes} | You worked as a **${job.name}**, and earned **${job.salary.toLocaleString()}$**! ${messageIfUserHasEnergyDrink}`)
            client.db2.set(`workt_${message.author.id}`, Date.now());
            clearInterval(i);
          },2000)
        }
        m.edit(
        new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Working as **${job.name}**`)
        .addField(`${workReplies.random()} ${client.createBar(progress, max, 25).percentage}`, client.createBar(progress, max, 25).bar)
            )
          }, 2000)
        })
      }
    }
  } else if(args[0].toLowerCase() === "jobs" || args[0].toLowerCase() === "list") {
    let embed = new Discord.MessageEmbed()
    .setTitle(`Jobs List - ${client.user.username}`)
    .setColor("RED")
    .setDescription("<:ytsmlocked:700340742291193916> = Locked | <:ytsmunlocked:700340741913968709> = Unlocked\nPlease run " + client.prefix + "work `<job-name>` to get a job.")
    jobs.forEach(async a => {
      let locked = (user && user.level >= a.levelRequired) ? "<:ytsmunlocked:700340741913968709>" : "<:ytsmlocked:700340742291193916>"
      embed.addField(`${locked} ${a.name}`, `Requires level: **${a.levelRequired}**\nSalary: **${a.salary}$**\nCooldown: **${moment(a.cooldown).format("h [hours]")}**`, true)
    });
    message.channel.send(embed);
  } else {
    let jobName = args.join(' ').toLowerCase();
    let userJob = client.jobs.get(jobName);
    if(!userJob) return message.channel.send(`${client.no} | Not a valid job! Please run \`${client.prefix}work jobs\` to see a list of availible jobs!`);
    if(userJob.levelRequired > user.level) return message.channel.send(`${client.no} | You must be level **${userJob.levelRequired} to unlock the **${userJob.name}** job!`);
    client.db.set(`yt_${message.author.id}`, userJob, "job");
    message.channel.send(`${client.yes} | Your job is now **${userJob.name}**! Run \`${client.prefix}work\` to start working!`);
  }
}