module.exports = {
  name: "equip",
  description: "Allows you to equip a device.",
  aliases: ["e"],
  run: async (client, message, args, janix) => {
    let item = args.join(' ').toLowerCase();
    let inventory = client.db.get(`yt_${message.author.id}`, "laptops");
    if(!args.length) return message.channel.send(`${janix.no} | Please give me an item!`)
    inventory.forEach(a => {
      if(item === a.name) {
        client.db.set(`yt_${message.author.id}`, a, "currentlaptop")
        message.channel.send(`Sucsessfully equipped **${a.emoji} ${a.displayname}**!`)
      }
    })
  }
}