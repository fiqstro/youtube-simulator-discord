module.exports.run = async function(client, message, args) {
  try {
  client.db.math(`yt_${message.author.id}`, "+", Math.floor(Math.random() * 19) + 1, "xp")
  } catch (e) {
    return;
  }
}