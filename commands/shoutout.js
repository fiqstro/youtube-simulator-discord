module.exports = {
  name: "shoutout",
  description: "Shouts someone out and give that user subscribers.",
  aliases: ["so"],
  cooldown: 4,
  run: async (client, message, args, janix) => {
    let subscheck = client.db.get(`yt_${message.author.id}`, "yt.subscribers");
    let user = message.mentions.users.first();
    if(!user) return message.channel.send(`${janix.no} | Please mention a user.`)
      let hasshoutedout = await client.db.get(`shoutout_${user.id + message.author.id}`)
    if(hasshoutedout) return message.channel.send(`${janix.no} | This user has already received a shoutout from you!`)
    if(user === message.author) return message.channel.send(`${janix.no} | You can't shout yourself out!`)
    if(subscheck < 1000) return message.channel.send(`${janix.no} | You need at least **1,000** subscribers to be able to shout a user out!`)
    let substoadd = Math.round(subscheck * 0.05);
    let othersub = client.db.get(`yt_${user.id}`, "yt.subscribers");
    othersub += substoadd;
    client.db.set(`shoutout_${user.id + message.author.id}`, true);
    client.db.set(`yt_${user.id}`, othersub, "yt.subscribers");
    message.channel.send(`${janix.yes} | You sucsessfully shout out **${user.username}**'s channel, and he/she got **${substoadd}** subscribers!`)
  }
}