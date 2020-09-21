const options = require('./options.js');
module.exports.run = async function(client) {
  console.log("[LOADING] Loading all subbot options...")
  options.forEach(item => {
  client.subopt.set(item.id, item);
  })
  console.log("[SUCSESS] Loaded all subbot options!");
};
