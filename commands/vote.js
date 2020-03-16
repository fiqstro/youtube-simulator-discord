let Discord = require("discord.js");

module.exports = {
  name: "vote",
  description: "Vote for the bot, and get subscribers!",
  aliases: ["votelink", "upvote"],
  run: async (client, message, args) => {
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle("Vote")
        .setColor("RED")
        .setDescription(
          "You can vote for me by clicking [here](https://top.gg/bot/681376963356524558/vote \"Vote me to get free subscribers 😄\")\nRewards for voting: +5% subscribers. (100 Bonus)"
        )
    );
  }
};
