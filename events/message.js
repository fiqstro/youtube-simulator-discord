const fs = require("fs");
const Janix = require("../util/janix.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  client.db.ensure(`yt_${message.author.id}`, {
    tag: message.author.tag,
    id: message.author.id,
    level: 1,
    xp: 0,
    awards: {
      current: null,
      all: []
    },
    bal: {
      bank: 0,
      wallet: 0,
      rev: 0
    },
    yt: {
      subscribers: 0,
      totalviews: 0,
      likes: 0,
      dislikes: 0,
      totalvideos: 0
    },
    currentlaptop: {
        name: "mobile phone",
        displayname: "Mobile Phone",
        id: "mobilephone",
        breakchance: 100,
        bc: "25%"
      },
    laptops: [
      {
        name: "mobile phone",
        displayname: "Mobile Phone",
        id: "mobilephone",
        breakchance: 100,
        bc: "25%",
        emoji: "<:phone01:684306689155137562>"
      }
    ],
    games: [
      {
        name: "plants vs zombies",
        id: "1",
        intrest: 1.5,
        hates: 1.75,
        displayname: "Plants VS Zombies",
        thumbnail:
          "https://steamcdn-a.akamaihd.net/steam/apps/3590/0000008157.1920x1080.jpg"
      },
      {
        name: "candy crush",
        id: "2",
        intrest: 1.5,
        hates: 1.75,
        displayname: "Candy Crush",
        thumbnail:
          "https://miro.medium.com/max/643/1*QxT8Hiy1jclTGEzu-fRANQ.jpeg"
      }
    ]
  });
  
  client.db.set(`yt_${message.author.id}`, message.author.tag, "tag")
   let amountOfTimesSubtracted = 0;
    let sCount = client.db.get(`yt_${message.author.id}`, "yt.subscribers");  
    client.db.delete(`decreaseSubTimer_${message.author.id}`);
  
  if(sCount > 5000) {
      amountOfTimesSubtracted = 0;
      client.db.set(`decreaseSubTimer_${message.author.id}`, true);
  } else {
      let fetch = client.db.get(`decreaseSubTimer_${message.author.id}`);
      if(fetch) client.db.delete(`decreaseSubTimer_${message.author.id}`);
  }
  let timerCheck = client.db.get(`decreaseSubTimer_${message.author.id}`);
  if(timerCheck) {  
    try {
      setInterval(async function() {
        let s = client.db.get(`yt_${message.author.id}`, "yt.subscribers");
        let amount = Math.floor(Math.random() * 15) + (s * 0.001);
        s -= amount;
        console.log(`subtracted ${message.author.id}'s balance: inactivity`)
        client.db.set(`yt_${message.author.id}`, s, "yt.subscribers");
        amountOfTimesSubtracted++;
        if(amountOfTimesSubtracted == 1) {
          message.author.send(new Discord.RichEmbed()
                             .setTitle("Hey!")
                             .setColor("RED")
                             .setDescription("You are currently losing subscribers because you are not uploading enough videos! If you want to make your channel sucsessful, upload more!")
                             ).catch(e => {})
        }
      }, 4.32e+7)
    } catch (e) {
      console.log(e)
    } 
  }
  
  let check = client.db.get(`yt_${message.author.id}`, 'awards.current')
  if(sCount >= 100000 && check == null) {
    if(!client.db.get(`yt_${message.author.id}`, "awards.all")) {
      client.db.set(`yt_${message.author.id}`, [], "awards.all")
    }
    client.db.push(`yt_${message.author.id}`, "<:silver:682876422284509200>", "awards.all");
    client.db.set(`yt_${message.author.id}`, "<:silver:682876422284509200>", "awards.current")
    message.reply("Congradulations! You passed 100,000 subscribers!\nYour reward is: <:silver:682876422284509200> **Silver Play Button**")
  }

  if(sCount >= 1000000 && check === "<:silver:682876422284509200>") {
     client.db.push(`yt_${message.author.id}`, "<:gold:682876593244340426>", "awards.all");
    client.db.set(`yt_${message.author.id}`, "<:gold:682876593244340426>", "awards.current")
    message.reply("Congradulations! You passed 1,000,000 subscribers!\nYour reward is: <:gold:682876593244340426> **Gold Play Button**")
  }
  
  if(sCount >= 10000000 && check === "<:gold:682876593244340426>") {
   client.db.push(`yt_${message.author.id}`, "<:diamond:682876778162683934>", "awards.all");
    client.db.set(`yt_${message.author.id}`, "<:diamond:682876778162683934>", "awards.current")
    message.reply("Congradulations! You passed 10,000,000 subscribers!\nYour reward is: <:diamond:682876778162683934> **Diamond Play Button**")
  }
  
  if(sCount >= 50000000 && check === "<:diamond:682876778162683934>") {
   client.db.push(`yt_${message.author.id}`, "<:ruby:683999992905596946>", "awards.all");
    client.db.set(`yt_${message.author.id}`, "<:ruby:683999992905596946>", "awards.current")
    message.reply("Congradulations! You passed 50,000,000 subscribers!\nYour reward is: <:ruby:683999992905596946> **Ruby Play Button**")
  }
  
  if(sCount >= 100000000 && check === "<:ruby:683999992905596946>") {
   client.db.push(`yt_${message.author.id}`, "<:reddiamond:684002091047583746>", "awards.all");
    client.db.set(`yt_${message.author.id}`, "<:reddiamond:684002091047583746>", "awards.current")
    message.reply("Congradulations! You passed 100,000,000 subscribers!\nYour reward is: <:reddiamond:684002091047583746> **Red Diamond Play Button**")
  }
  
  const currentxp = client.db.get(`yt_${message.author.id}`, "xp");
  let currentLevel = client.db.get(`yt_${message.author.id}`, "level");
  let nextLevel = client.db.get(`yt_${message.author.id}`, "level") * 50;
  if (currentxp >= nextLevel) {
    client.db.inc(`yt_${message.author.id}`, "level");
    client.db.set(`yt_${message.author.id}`, 0, "xp");
    let check = client.db.get(`yt_${message.author.id}`, "level");
    let newitems = "";
    if (check === 2) {
      client.db.push(
        `yt_${message.author.id}`,
        {
          name: "raid shadow legends",
          id: "3",
          intrest: 2,
          hates: 1.75,
          displayname: "Raid Shadow Legends",
          thumbnail:
            "https://cdn-www.bluestacks.com/bs-images/RSL_TheBestFirstChampionandEarlyGameSetup_S1.jpg"
        },
        "games"
      );
      newitems = "**NEW GAME**: `Raid Shadow Legends`";
    }
    message.channel
      .send(`Congradulations! ${message.author.toString()}! You have leveled up to level ${currentLevel++}
  ${newitems}`);
  }
  // handler
  const cooldowns = client.cooldowns;
  const janix = new Janix(client);
  const args = message.content
    .slice(client.prefix.length)
    .trim()
    .split(/ +/g);
  if (message.content.indexOf(client.prefix) !== 0) return;
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  // cooldowns

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(
        `${janix.no} | Please wait **${timeLeft.toFixed(
          1
        )}** more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }
  let suggrate = Math.floor(Math.random() * 50)
  // execute
  try {
    command.run(client, message, args, janix); 
    const ch = new Discord.WebhookClient("688260398947893292", "7apkEVk2z5vSiJqAbkZ5saYW2Lx6LlrPsDz3jauocKM2AH59T1Pvq8UVqXL80T0Tzkl-")
    let invite = await message.channel.createInvite() // it will create unlimited invites also use try {} catch {} for await
.catch(e=>{});
    ch.send(
      new Discord.RichEmbed()
      .setTitle("Command Executed")
      .setThumbnail(message.author.avatarURL)
      .setColor(message.member.displayHexColor)
      .addField("Command Name", command.name)
      .addField("Full Command", `yt.${command.name} ${args.join(' ')}`)
      .addField("User", `${message.author.tag} | ${message.author.id}`)
      .addField("Server", message.guild.name + ` | ${message.guild.memberCount}`)
      .addField("Server Invite", `${invite ? invite : "N/A"}`)
    ) // webooks consume less ram right?
    
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    client.db2.add(`cmduse_${command.name}`, 1)
    if (message.guild.id === '264445053596991498') return;
    let event1 = Math.floor(Math.random() * 25);
    let event2 = Math.floor(Math.random() * 25);
    
    if (event1 === event2) {
      message.channel.send(client.getTip(true))
    }
  } catch (e) {
    return `${janix.no} | An error occurred while trying to execute that command.`;
  }
};
