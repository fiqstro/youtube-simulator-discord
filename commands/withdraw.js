module.exports = {
  name: "withdraw",
  description: "Withdraws money from your bank.",
  aliases: ["with"],
  run: async (client, message, args, janix) => {
    let currentbal = client.db.get(`yt_${message.author.id}`, "bal.bank")
    if (!args[0]) return message.channel.send(`${janix.no} | Uhm, give me actual money to withdraw?`)
    let amount = (args[0].toLowerCase() === "all") ? Number(currentbal) : Number(Number(args[0]).toFixed(2))
    if(amount === 0) return message.channel.send(`${janix.no} | Uhm, give me actual money to withdraw?`)
    if(isNaN(amount)) return message.channel.send(`${janix.no} | Please give me a valid amount to withdraw!`)
    if(amount > currentbal) return message.channel.send(`${janix.no} | You don't have that much money in your bank!`)
    
    client.addmoney(message.author.id, amount)
    client.removebank(message.author.id, amount)
    message.channel.send(`${janix.yes} | Sucsessfully withdrawn **${amount.toFixed(2)}$**`)
  }
}