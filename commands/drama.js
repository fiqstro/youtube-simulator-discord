const dramaManager = require("../util/dramaManager.js");
const Discord = require("discord.js");
module.exports = {
  name: "drama",
  description: "Starts up a drama with a user.",
  aliases: ["fight"],
  run: async (client, message, args, janix) => {
    const drama = new dramaManager(client, message);
    let author1 = message.author.username;
        let mysubs = client.db.get(`yt_${message.author.id}`, "yt.subscribers")
    if(mysubs < 10000) return message.channel.send(`${janix.no} | You need at least **10,000** subscribers to start a drama with somebody.`)
    let user = message.mentions.users.first();
    
    if (!user)
      return message.reply(
        `${janix.no} | Please give me a valid user to start a drama!`
      );
    if (user.id == message.author.id)
      return message.reply(
        `${janix.no} | You can't start drama with yourself...`
      );
    
    if (user.bot == true)
      return message.reply(`${janix.no} | You cannot start drama with bots!`);
    
    let usersubs = client.db.get(`yt_${user.id}`, "yt.subscribers")
    if(usersubs < 10000) return message.channel.send(`${janix.no} | Please start a drama with someone that has more than **10,000** subscribers!`)
    
    var fighter1 = message.author.id;
    var fighter2 = user.id;
    var challenged = user.toString();
    message.channel
      .send(
        `${challenged}, ${author1} wants to start a drama with you. Do you accept? (yes or no)`
      )
      .then(() => {
        message.channel
          .awaitMessages(
            response =>
              (response.content == "yes" && response.author.id == fighter2) ||
              (response.content == "no" && response.author.id == fighter2),
            {
              max: 1,
              time: 60000,
              errors: ["time"]
            }
          )
          .then(collected => {
            if (collected.first().content.toLowerCase() == "yes") {
              message.channel
                .send(
                  new Discord.RichEmbed()
                    .setTitle(`${message.author.username} vs ${user.username}`)
                    .setColor("RED")
                    .setDescription("Drama will start soon...")
                )
                .then(m => {
                  setTimeout(function() {
                    drama.drama(message.author, user, m);
                  });
                }, 2000);
    
            } else if (collected.first().content.toLowerCase() == "no") {
              message.channel.send(
                `${janix.no} | User declined, request cancelled.`
              );
            }
          })
          .catch(e => {
            console.log(e);
            message.channel.send(
              `${janix.no} | No response, request cancelled.`
            );
          });
      });
  }
};
