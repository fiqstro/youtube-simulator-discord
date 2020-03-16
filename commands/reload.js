module.exports = {
  name: "reload",
  description: "Reloads a command",
  cooldown: 3,
  hidden: true,
  aliases: ["rel", "refresh"],
  run: async function(client, message, args, janix) {
    let owners = [
      "681746185073065985",
      "400845681574674442",
      "480933736276426763"
    ];

    if (!owners.includes(message.author.id)) {
      return;
    }
    if (!args.length)
      return message.channel.send(
        `${janix.no} | You didn't pass any command to reload, ${message.author}!`
      );
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command)
      return message.channel.send(
        `${janix.no} | There is no command with name or alias \`${commandName}\`, ${message.author}!`
      );
    delete require.cache[require.resolve(`./${commandName}.js`)];
    try {
      const newCommand = require(`./${commandName}.js`);
      client.commands.set(newCommand.name, newCommand);
      message.channel.send(
        `${janix.yes} | Command \`${newCommand.name}\` was reloaded!`
      );
    } catch (error) {
      console.log(error);
      message.channel.send(
        `${janix.no} | There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``
      );
    }
  }
};
