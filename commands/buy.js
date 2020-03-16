module.exports = {
name: "buy",
description: "Buys a game from the shop.",
aliases: ["b"],
cooldown: 3,
run: async (client, message, args, janix) => {
if(!args.length) return message.channel.send(`${janix.no} | Please do either **${client.prefix}buy** game, or **${client.prefix}buy** device!`)
if(args[0].toLowerCase() === "game") { 
  let item = client.shop.get(args.slice(1).join(' ').toLowerCase());
  let level = client.db.get(`yt_${message.author.id}`, "level");
  let balance = client.db.get(`yt_${message.author.id}`, "bal.bank")
  let checkdev = client.db.get(`yt_${message.author.id}`, "currentlaptop.emoji")
  let inventory = client.db.get(`yt_${message.author.id}`, "games")
  if(!item) return message.channel.send(`${janix.no} | Item not found!`)
  if(checkdev !== item.require && item.require) return message.channel.send(`${janix.no} | You need a **${item.require} ${item.pcRequire}** to buy this item!`)
  let filter = inventory.filter(a => a.name == item.name) 
  console.log(filter)
if(inventory.some(a => a.name === item.name)) { return message.channel.send(`${janix.no} | You already have this item!`)}
  let requiredlevel = item.requireLevel;
  if(requiredlevel > level) {
    return message.channel.send(`${janix.no} | You need to be level **${item.requireLevel}** to be able to buy **${item.displayname}**!`)
  } else if(balance < item.cost) {
    return message.channel.send(`${janix.no} | You don't have enough money to buy this item! Make sure they are in your **Bank Account**!`)
  } else {
    client.db.push(`yt_${message.author.id}`, {
        name: item.name,
        id: '4',
        intrest: item.intrest,
        hates: item.hates,
        displayname: item.displayname,
        thumbnail: item.thumbnail
      },"games")
    message.channel.send(`${janix.yes} | Sucsessfully bought **${item.displayname}**!`)
    client.removebank(message.author.id, item.cost)
  } 
} else if(args[0].toLowerCase() === "device") {
  let item = client.devices.get(args.slice(1).join(' ').toLowerCase());
  if(!item) return message.channel.send(`${janix.no} | Item not found.`)
    let balance = client.db.get(`yt_${message.author.id}`, "bal.bank")
    let inventory = client.db.get(`yt_${message.author.id}`, "laptops")
    let filter = inventory.filter(a => a.name == item.name).map(a => a)
    if(inventory.some(a => a.name === item.name)) { return message.channel.send(`${janix.no} | You already have this item!`) } else {
  if(balance < item.cost) {
    return message.channel.send(`${janix.no} | You don't have enough money to buy this item! Make sure they are in your **Bank Account**!`)
  } else {
 client.db.push(`yt_${message.author.id}`, item, "laptops")
message.channel.send(`${janix.yes} | Sucsessfully bought **${item.displayname}**!`)
  client.removebank(message.author.id, item.cost)
    }
  }
} else {
  return message.channel.send(`${janix.no} | Please do either **${client.prefix}buy** game, or **${client.prefix}buy** device!`)
}
}} //k u bracket dummy