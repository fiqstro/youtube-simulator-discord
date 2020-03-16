module.exports = {
  name: "give",
  description: "Give money to someone you love.",
  aliases: ["pay", "share"],
  cooldown: 5,
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.get(args[0]);
    if (!user) return message.channel.send("<:yo_what:686470979069018137> Mention a user mate!");
    if (user.bot) return message.channel.send("<:yo_what:686470979069018137> You fool, dont try to share your money with bots k?");
    let bal = args[1];
    if (!bal) return message.channel.send("<:yo_what:686470979069018137> what r u going to pay?");
    if (isNaN(bal)) return message.channel.send("<:yo_what:686470979069018137> that amount isn't a number?");
    
    let balance = client.db.get(`yt_${message.author.id}`, "bal.wallet") || 0;
    if (bal > balance.wallet) return message.channel.send("<:yo_what:686470979069018137> I'm not a credit card? Your amound should be less than or equal to your wallet amount")
    let arb = balance.wallet - parseInt(bal);
    let atb = client.db.get(`yt_${user.id}`, "bal.wallet").wallet + parseInt(bal);
    client.db.set(`yt_${message.author.id}`, arb, "bal.wallet");
    client.db.set(`yt_${user.id}`, atb, "bal.wallet");
    return message.channel.send(`User ${message.author} shared **${parseInt(bal)}$** with ${user}!`);
    // let Discord = require("discord.js");
    // message.channel.send(
    //   new Discord.RichEmbed()
    //     .setTitle(`${user.username}'s profile!`)
    //     .addField("Wallet", balance.wallet.toLocaleString() + "$")
    //     .addField("Bank", balance.bank.toLocaleString() + "$")
    //     .setColor("RED")
    // );
  } //ugh
};
