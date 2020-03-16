let shop = require("./shop.js");
let laptop = require('./laptop.js')
module.exports.handle = client => {
  shop.forEach(item => {
    console.log(`Loading item ${item.name}`);
    client.shop.set(item.name, item);
    console.log(`Loaded item ${item.name}`);
  });
  laptop.forEach(item => {
    console.log(`Loading item ${item.name}`)
    client.devices.set(item.name, item)
    console.log(`Loaded item ${item.name}`)
  })
};
