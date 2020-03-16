module.exports = {
  name: "setsubs",
  description: "adds subs",
  aliases: ['ss'],
  hidden: true,
  run: async (client, message, args, janix) => {
    let owners = [
  "681746185073065985",
  "400845681574674442"
];
  
  if (!owners.includes(message.author.id)) {return;}
    let user = message.mentions.users.first() || message.author;
    let amount = Number(args[0])
    if(!amount || isNaN(amount)) return message.channel.send(`${janix.no} | Error: invalid amount`)
    if(!user) return message.chnanel.send(`${janix.no} | Error: no user provided`)
    client.db.set(`yt_${user.id}`, amount, "yt.subscribers")
    message.channel.send(`${janix.yes} | you now have **${amount}** subscribers :D`)
  }
}