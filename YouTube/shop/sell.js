module.exports.run = async function(client,message,args) {
  let itemName = args.join(' ').toLowerCase();
  let item = client.db.get(`yt_${message.author.id}`, `inventory.${itemName}`);
  if(!item) return message.channel.send(`${client.no} | Item not found!`)
  // command
  try {
    //message.channel.send(`u wanted to sell ${item.name}`)
    console.log(item)
    let sellprice = item.sellPrice;
    
    if(item.quantity > 1) {
      client.db.math(`yt_${message.author.id}`, "-", 1, `inventory.${itemName}.quantity`)
      client.db.math(`yt_${message.author.id}`, "+", sellprice, "balance.wallet");
      return message.channel.send(`${client.yes} | You have sold ${item.icon} **${item.name}** for **$${item.sellPrice}**`)
    } else {
      client.db.delete(`yt_${message.author.id}`, `inventory.${itemName}`);
      client.db.math(`yt_${message.author.id}`, "+", sellprice, "balance.wallet")
      return message.channel.send(`${client.yes} | You have sold ${item.icon} **${item.name}** for **$${item.sellPrice}**`)
    }
    
  } catch(e) {
    return message.channel.send(`${client.no} | An error has occured. Please try again later.`)
    console.log(e);
  }
}