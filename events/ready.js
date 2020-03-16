let shop = require("../items/shophandler.js");

module.exports = client => {
  console.log(`Bot is ready!`);
  shop.handle(client);
   client.user.setStatus('dnd') 
  
  // DBL shit;
  setInterval(() => {
    
      let guilds = client.guilds.size
      client.user.setActivity(`${client.guilds.size.toLocaleString()} guilds || lottery is out every 2hrs!`, {type: "WATCHING"});
		  client.dbl.postStats(guilds);
      
     // let's make a loop yea for it to have multiple activities kok
    }, 30000);
  
  client.dbl.on('posted', () => {
  console.log('Server count posted!');
  })
  
  setInterval(() => {
  let time = client.db.get(`LotteryTime`) || Date.now();
  if(Date.now() >= time) {
    client.emit("LotteryTime!", {
      users: client.db.get(`LotteryUsers`) || []
    });
    client.db.set(`LotteryTime`, (Math.floor(Date.now() + 7.2e+6)));
    client.db.set(`LotteryUsers`, []);
  }
}, 1000);

};
