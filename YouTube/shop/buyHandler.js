module.exports.run = (client,message,args) => {
  // Variables
  let itemName = args.join(' ');
  let item = client.shop.get(itemName);
  let userBalance = client.db.get(`yt_${message.author.id}`, "balance.wallet");
  let inventory = client.db.get(`yt_${message.author.id}`, `inventory.${item.id}`);
  
  // check if user can buy the item
  if(!item) return message.channel.send(`${client.no} | Item not found!`);
  if(userBalance < item.cost) return message.channel.send(`${client.no} | You don't have enough money to buy this item!`);

  try {
    let quantity = (inventory && inventory.quantity) ? inventory.quantity + 1 : 1;
    let itemStructure = {
    name: item.name,
    id: item.id,
    cost: item.cost,
    icon: item.icon,
    quantity: quantity,
    description: item.description,
    uploadBoost: item.uploadboost || 0,
    allowDuplicates: item.allowDuplicates || true,
    workBoost: item.workBoost || 0,
    viewBoost: item.viewBoost || 0,
    costPerVideo: item.costPerVideo || 0,
    sellPrice: Number((item.cost / 2).toFixed(2))
    };
    client.db.set(`yt_${message.author.id}`, itemStructure, `inventory.${item.id}`);
    client.db.math(`yt_${message.author.id}`, "-", itemStructure.cost, "balance.wallet");
    message.channel.send(`${client.yes} | Successfully bought **${item.name}** for $${item.cost}!`)
  } catch (e) {
    console.log(e)
    return message.channel.send(`${client.no} | An error occurred whilst trying to buy **${item.name}**, please try again later.`)
  }
}