const {
    Client,
    Collection
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const Enmap = require("enmap");
const chalk = require("chalk");
const xpManager = require('../leveling/xpHandler.js');
let levelUpdateManager = require("../leveling/levelUpdateManager.js");
let jobsHandler = require('../work/jobsHandler');
const shopHandler = require('../YouTube/shop/handler');
const pingCache = require('../YouTube/util/pingcache');
const shopUtil = require('../YouTube/shop/util');
const SubBotHandler = require('../YouTube/subbot/SubBotHandler.js');

class YouTubeSimulator extends Client {
    constructor(options) {
        super(options);
        this.config = require("../config.json");
        this.prefix = this.config.prefix;
        this.yes = "<:yesu:690460313757417482>";
        this.no = "<:nou:690460313803423774>";
        this.owners = this.config.owners;
        this.errorMessage = `${this.no} | We ran into an error. Please report this to a bot developer.`;
        this.color = "";
        this.pings = [];
        this.aliases = new Collection();
        this.commands = new Collection();
        this.jobs = new Collection();
        this.subopt = new Collection();
        this.db = new Enmap({
            name: "user",
            ensureProps: true
        });
      this.db2 = require('quick.db')
      this.shop = new Collection();
      
      //get server count
      this.getServerCount = async function() {
      const req = await this.shard.fetchClientValues('guilds.cache.size');
      return Number(req.reduce((p, n) => p + n, 0)).toLocaleString();
    }

    this.onReady = async function () {
            let timestamp1 = Date.now();
            await this.loadCommands()
            await jobsHandler.run(this);
            await shopHandler.run(this);
            await pingCache.run(this);
            await SubBotHandler.run(this);
            let timestamp2 = Date.now();
            let servers = await this.getServerCount()
            console.log(chalk.green(`[SUCSESS] Ready! (Shard Count: ${this.shard.count}, Server Count: ${servers}) - Time took: ${timestamp2 - timestamp1}ms`));
    };
      
        this.onMessage = async function (message) {
            if (!message.content) return;
            if (message.author.bot) return;
          const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const prefixRegex = new RegExp(`^(<@!?${this.user.id}>|${escapeRegex("iuigiugiug")})\\s*`);
          
          if(message.content.match(prefixRegex)) {
            return message.channel.send(`The prefix for this bot is \`${this.prefix}\``)
            }
          
          let user = this.db.get(`yt_${message.author.id}`);
          if(user) {
            if(user.xp >= user.level * 200) {
              let newLevel = user.level + 1;
              levelUpdateManager.run(this, message, newLevel);
            }
          }
            if (!message.content.startsWith(this.prefix)) return;
            const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
            const command = this.commands.get(args.shift().toLowerCase());
            if (!command) {
                const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
                const aliasCommand = this.aliases.get(args.shift().toLowerCase());
                if (!aliasCommand) return;
             
                await aliasCommand.run(this, message, args);
                await xpManager.run(this, message, args);
                await this.onCommandRan(message.author, command);
            
                return;
            };
            let timestamp1 = Date.now();
            await command.run(this, message, args);
            await xpManager.run(this, message, args);
            await this.onCommandRan(message.author, command);
            let timestamp2 = Date.now();
            let ping = timestamp2 - timestamp1;
            
        };
      
        this.onMessageUpdate = async function (oldMessage, newMessage) {
            try {
                if (oldMessage.content == newMessage.content) return;
                if (!newMessage.content) return;
                if (newMessage.author.bot) return;
                if (!newMessage.content.startsWith(this.prefix)) return;
                const args = newMessage.content.slice(this.prefix.length).trim().split(/ +/g);
                const command = this.commands.get(args.shift().toLowerCase());
                if (!command) {
                    const aliasCommand = this.aliases.get(args.shift().toLowerCase());
                    if (!aliasCommand) return;
                    let timestamp1 = Date.now();
                    await aliasCommand.run(newMessage, args, this);
                    await this.onCommandRan(newMessage.author, command);
                    let timestamp2 = Date.now();
                    let ping = timestamp2 - timestamp1;
                    
                    return;
                };
                let timestamp1 = Date.now();
                await command.run(newMessage, args, this);
                await this.onCommandRan(newMessage.author, command);
                let timestamp2 = Date.now();
                let ping = timestamp2 - timestamp1;
                
            } catch (error) {
                //message.channel.send(this.errorMessage);
                console.log(chalk.red(error));
            };
        };

        this.onCommandRan = async function (user, command) {
            try {
                console.log(chalk.yellow(`[INFO] ${user.username} just ran a command.`));
            } catch (error) {
                //message.channel.send(this.errorMessage);
                console.log(chalk.red(error));
            };
        };

        /* 
        const onReady = client.onReady || {};
        client.onReady = function () {
            console.log("Bot Ready (modified)");
            onReady.apply(this, arguments);
        };
        */
        // Call the functions
        this.on("ready", async () => {
          this.onReady()
          let ban = await this.getServerCount()
          await this.shard.broadcastEval(`this.user.setActivity(\`youtube.com | ${ban} servers\`, {type:"WATCHING"})`)
          console.log("status set!!!")
        });
        this.on("message", (message) => this.onMessage(message));
        this.on("messageUpdate", (oldMessage, newMessage) => this.onMessageUpdate(oldMessage, newMessage));

        // I decided to auto load commands instead of doing client.loadCommands() just to keep code clean.
      
        
    };
      loadCommands() {
        console.log(`[LOADING] Loading commands...`)  
      readdirSync("./commands/").forEach(dir => {
            const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
          for (const commandFile of commands) {
                const command = new(require(`../commands/${dir}/${commandFile}`))(this);
                this.commands.set(command.help.name, command);
                command.config.aliases.forEach(alias => {
                    this.aliases.set(alias, command);
                });
            };
        });
      console.log(`${chalk.green('[SUCSESS]')} Loaded all commands!`)
      }  
  
    createBar(value, maxValue, barSize) {
        let percentage = value / maxValue; 
        let progress = Math.round((barSize * percentage)); 
        let emptyProgress = barSize - progress; 
        let progressText = "▇".repeat(progress); 
        let emptyProgressText = "▇".repeat(emptyProgress); 
        let percentageText = Math.round(percentage * 100) + "%"; 
        let bar = {
         bar: `[${progressText}](https://www.youtube.com/watch?v=pKO9UjSeLew)${emptyProgressText}`,
         percentage: `${percentageText}`
        }
        return bar;
    }
  
    deleteItem(item, client, user) {
      shopUtil.deleteItem(item, client, user)
    }
  
    fetchData(id) {
      
      let data = this.db.get(`yt_${id}`);
      if(!data) throw new Error("There is no data for this user");
      return data;
      
    }
};

module.exports = YouTubeSimulator;