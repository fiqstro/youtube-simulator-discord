let util = require('../util/prestige.js');

module.exports = {
  name: "prestige",
  description: "Resets all of your stats, but gives you a fancy little badge.",
  aliases: ["prst"],
  run: async (client, message, args, janix) =>{

    let check = client.db.get(`yt_${message.author.id}`, 'awards.all')
    if(!check.includes("<:diamond:682876778162683934>")) return message.channel.send(`${janix.no} | You cannot prestige without the **Diamond Play Button**!`)
    message.channel.send(`Prestiging will reset all of your current stats. Do you want to do it? (yes or no)`).then((m)=>{
      message.channel.awaitMessages(response => response.author.id === message.author.id, {max:1,time:30000,error:['time']}).then(msg =>{
        if(msg.first().content.toLowerCase() === "no") {
          return message.channel.send(`${janix.no} | Alright, i won't do it then.`)
        } else
        if(msg.first().content.toLowerCase() === "yes") {
          let cp = client.db.get(`yt_${message.author.id}`, "prestige.name")
          if(!cp) {
            util.prestige(client, message.author, "Bronze V", 5, "<:prestige_v:682889550544109575>", 10)
            message.channel.send(`${janix.yes} | Done! You have upgraded to **Bronze V** <:prestige_v:682889550544109575>`)
          } else if(cp.startsWith("Bronze")) {
            util.prestige(client, message.author, "Silver IV", 4, "<:prestige_iv:682890553116852234>", 20)
            message.channel.send(`${janix.yes} | Done! You have upgraded to **Silver IV** <:prestige_iv:682890553116852234>`)
          } else if(cp.startsWith("Silver")) {
            util.prestige(client, message.author, "Gold III", 3, "<:prestige_iii:682890862270611481>", 30)
            message.channel.send(`${janix.yes} | Done! You have upgraded to **Gold III** <:prestige_iii:682890862270611481>`)
          } else if(cp.startsWith("Gold")) {
            util.prestige(client, message.author, "Diamond II", 2, "<:prestige_ii:682891956795473925>", 40)
            message.channel.send(`${janix.yes} | Done! You have upgraded to **Diamond II** <:prestige_ii:682891956795473925>`)
          } else if(cp.startsWith("Diamond")) {
            util.prestige(client, message.author, "Legendary I", 1, "<:prestige_i:682891957328019460>", 50)
            message.channel.send(`${janix.yes} | Done! You have upgraded to **Legendary I** <:prestige_i:682891957328019460>`)
          } else {
            return message.channel.send(`${`${`${`${`${`${`${janix.no}`}`}`}`}`}`} | You have already reached the max prestige...`) //same thing.. but why | stfu we are retarded | no u  | yes u
          }
        }
      }).catch(e=>{
        return message.channel.send(`${janix.no} | No response provided, canceled.`)
      })
    })
    
  }
}