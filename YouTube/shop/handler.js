const shop = require('./items');
module.exports.run = (client) => {
  shop.forEach(item => {
    //console.log(`Loading ${item.id}`)
    client.shop.set(item.id, item)
    //console.log(`Loaded ${item.id}`)
  })
}