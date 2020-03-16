const Discord = require('discord.js');
let yesno = ['yes', 'no'];

module.exports = {
  name: "lottery",
  aliases: [],
  description: 'Join a lottery, and get a chance to win!',
  run: async(client, message, args, janix) => {
    let balance = client.db.get(`yt_${message.author.id}`,"bal.wallet") || 0;
    let guild = client.guilds.get('584690931039731723'); 
    let joinedUsers = (client.db.get("LotteryUsers") || []);
    if(joinedUsers.includes(message.author.id)) return message.channel.send(`${janix.no} | You have already joined the lottery!`);
    message.channel.send({
      embed: new Discord.RichEmbed()
      .setDescription(`Do you wanna join the lottery by buying a ticket for 14.99$? (yes/no)`)
      .setTitle("Lottery")
      .setURL("https://discord.gg/bWgPgws")
      .setColor(client.color)
    })
    .then(msg => {
      msg.channel.awaitMessages(m => m.author.id == message.author.id && yesno.includes(m.content.toLowerCase()), {
        time: 30000,
        max: 1,
        errors: ['time']
      })
      .then(collection => {
        let msg = collection.first().content.toLowerCase();
        if(msg == 'yes') {
          if(balance < 14.99) return message.channel.send(`${janix.no} | You don't have enough money in your wallet to buy a lottery ticket, POOR.`);
          client.db.push("LotteryUsers", message.author.id);
          message.channel.send(`${janix.yes} You have been added to the list people who have a chance to WIN the lottery and a wage of 100k Subscribers! which rerolls every 2 hours! Lottery results are posted in our support server. Run yt.support to join :)`);
          let channel = client.channels.get("688727149229768727");
          channel.send(`**${message.author.tag}** Just Entered the lottery!`);
          client.db.math(`yt_${message.author.id}`, "-", 14.99, "bal.wallet");
        } else 
          if(msg == "no") {
            return message.channel.send(`${janix.yes} | Alright,  you cancelled.`)
          }
      })
      .catch(err => {
        message.channel.send(`${janix.no} | No response, cancelled.`)
      })
    })
  }
}
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
                               /*sex sex sex sex sex sex sex*/
                               /*sex sex sex sex sex sex sex*/
                               /*sex sex sex sex sex sex sex*/
  // whyy? - TheNoob27         /*sex sex sex sex sex sex sex*/
                               /*sex sex sex sex sex sex sex*/
                               /*sex sex sex sex sex sex sex*/
                               /*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/
/*sex sex sex sex sex sex sex*//*sex sex sex sex sex sex sex*/