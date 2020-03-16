module.exports = {
  name: "ping",
  description: "Shows the bot ping.",
  cooldown: 5,
  aliases: [],
  run: async (client, message, args, janix) => {
    message.channel
      .send("Pinging...")
      .then(m =>
        m.edit(
          `**API:** \`${Math.round(
            client.ping
          )}ms\`\n**Message:** \`${Date.now() - message.createdTimestamp}ms\``
        )
      );
  }
};
