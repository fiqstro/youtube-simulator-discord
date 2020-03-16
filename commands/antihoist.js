module.exports = {
name: "antihoist",
description: "does shit",
hidden: true,
run: async (client, message, args) => {
  
let owners = [
  "681746185073065985",
  "400845681574674442",
  "480933736276426763",
  "544922024301297691"
];
if (!owners.includes(message.author.id)) return message.channel.send('no');
 let index = 0;
 let randomusername = [
   "Superultracoolguy",
   "Epicgamer",
   "PingableUsername",
   "OPMasterUser",
   "qwertyuiop",
   "Sexygamer",
   "EpicHoister",
   "zAttentionSeeker",
   "zxcvbnm"
 ]
  message.guild.members.forEach(a => {
    if((/([A-Za-z])\w+/g).match(a.user.username.substr(0, 1))) {
      if(!a.user.username.substr(0, 1).match(/[A-Za-z]/)) {
     a.setNickname(randomusername.random() + ++index)
     console.log(`changing ${a.user.username}'s username.`)
  }
    }
  })
  message.channel.send(`${index} usernames changed.`)
  
}}