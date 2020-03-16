const Discord = require('discord.js')

module.exports = (client, info) => {
   let users = info.users || [];
  console.log(info)// crashing the bot 69 times no
  let boi = Math.floor(Math.random() * users.length);
  let ussr  = users[boi];
  let channel = client.channels.get('688727217072898065');
  if(users.length == 0 || !ussr) {
    return 
    channel.send("No users entered, lottery was reset");
  }
  let user = client.users.get(ussr); //its not caching ppl
  let subs = Math.floor(Math.random() * 5000) + 100000;
  channel.send({
    embed: new Discord.RichEmbed()
    .setAuthor(user ? user.tag : "unknown user", user ? user.displayAvatarURL : client.user.displayAvatarURL)
    .setDescription(`${users.length} users entered, out of all ~ **${user ? user.tag : `<@${boi}>`}** just won the lottery and walked away with ${subs.toLocaleString()} subscribers! 🏆`) //wee thats smart
    .setColor(client.color)
  })
   client.db.math(`yt_${ussr}`, "+", subs, "yt.subscribers")
   let channel2 = client.channels.get("688727149229768727");
   channel2.send(`This lottery was completed, users reset. Join lottery again for another chance to win!`);
  if(user) {
    user.send("You have WON the lottery with " + subs + " Subccribers!");
  }
}