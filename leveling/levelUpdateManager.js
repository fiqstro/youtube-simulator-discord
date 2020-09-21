module.exports.run = (client, message, newLevel) => {
  client.db.set(`yt_${message.author.id}`, newLevel, "level");
  client.db.set(`yt_${message.author.id}`, 0, "xp");
  message.channel.send(`${client.yes} | Congratulations, ${message.author}! You leveled up to level **${newLevel}!**`);
  if(newLevel === 10) {
    let achievements = client.db.get(`yt_${message.author.id}`, "badges");
    if(!achievements) achievements = [];
    achievements.push(`<:level10:755284958892785705>`)
    client.db.set(`yt_${message.author.id}`, achievements);
    message.channel.send(`❕ | **${message.author.username}** has unlocked the badge: **Bronze Medal <:level10:755284958892785705>**`)
  } 
  
}