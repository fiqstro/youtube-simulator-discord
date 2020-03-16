module.exports = {
name: "deposit",
aliases: ["dep"],
description: "Deposits money into your bank",
cooldown: 5,
run: async (client, message, args, janix) => {
  if(!args.length) return message.channel.send(`${janix.no} | Please give me an amount to deposit!`)

  let currentbal = client.db.get(`yt_${message.author.id}`, "bal.wallet")
    let amount = (args[0].toLowerCase() === "all") ? currentbal : Number(Number(args[0]).toFixed(2))
    if(amount === 0) return message.channel.send(`${janix.no} | Uhm, give me actual money to deposit?`)
    if(isNaN(amount)) return message.channel.send(`${janix.no} | Please give me a valid amount to deposit!`)
    if(amount > currentbal) return message.channel.send(`${janix.no} | You don't have that much money in your wallet!`)
    
    client.addbank(message.author.id, amount)
    client.removemoney(message.author.id, amount)
    message.channel.send(`${janix.yes} | Sucsessfully deposited **${amount.toFixed(2)}$**`)
  
}}