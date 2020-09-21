const Command = require("../../base/Command");
const owners = require("../../config.json").owners;

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: "reload",
      aliases: ["rel"],
      description: "Reloads a command.",
      category: "Developer",
      usage: " <command>"
    })
  }
  
async run(client, message, args) {  
if (!args.length) return message.channel.send(`${client.no} | You didn't pass any command to reload, ${message.author}!`);
const commandName = args[0].toLowerCase();
const command = client.commands.get(commandName) || client.aliases.get(commandName)
if (!command) return message.channel.send(`${client.no} | There is no command with name or alias \`${commandName}\`, ${message.author}!`);
  delete require.cache[require.resolve(`../${command.help.category}/${command.help.name}.js`)];  
  try {
	const newCommand = require(`../${command.help.category}/${command.help.name}.js`);
	client.commands.set(newCommand.name, newCommand);
  message.channel.send(`${client.yes} | Command \`${newCommand.name}\` was reloaded!`)
} catch (error) {
	console.log(error);
	message.channel.send(`${client.no} | There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``)
}
  
}
  
}

module.exports = Reload;