const Discord = require('discord.js');
const config = require('./config.json');
const colors = require('./colors.json');
const system = require('./system.json');
const fs = require('fs');
const bot = new Discord.Client();
var botStatus = config.bot.status.mode;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const GuildModel = require('./models/Guild');
const UserModel = require('./models/User');
const { connect } = require('mongoose');
var botActivity = config.bot.status.activity;
var blackListMsgStatus = config.bot.moderation.blackListing.enabled;
var blackListMsg = config.bot.moderation.blackListing.errorMessage;
bot.on('ready', async () => {
    console.log('MAIN SHARD ONLINE\n-------------------------')
    if(config.bot.commandLogging == true){
        console.log('Command logging is now enabled!\n-------------------------');
    } else {
        console.log('Command logging is not enabled!\n-------------------------')
    }
    if(config.bot.messageLogging == true){
        console.log('Message logging is now enabled!');
    } else {
        console.log('Message logging is not enabled!')
    }
    console.log('----[DATA CONFIGURATING]----');
    await connect(config.db.mongodb, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('FINISHED!')
    console.log('----[STARTING SHARDS]----')
    bot.user.setStatus(botStatus);
    function StartShards() {
        fs.readdir("./commands/", (err, files) => {
            if(err) console.log(err);
        
            let jsfile = files.filter(f => f.split(".").pop() === "js")
                if(jsfile.length <= 0) {
                    console.log("ERROR: There is not an existing [commands] folder OR there are no files in the [commands] folder!");
                }
        
                jsfile.forEach((f) => {
                    let props = require(`./commands/${f}`);
                    console.log(`SHARD: [${f}] IS ONLINE\n-------------------------`);
                    bot.commands.set(props.help.name, props);
                    props.help.aliases.forEach(alias => {
                        bot.aliases.set(alias, props.help.name);
                    })
                })
        })
    }
    setTimeout(StartShards, 1000);
    setTimeout(()=>{
        bot.user.setActivity(botActivity);
    }, 2000);
})
bot.on("message", async message => {
    var messageAuthor = message.member.user.tag;
    if(config.bot.messageLogging == true){console.log('ML -> [' + message.guild.name + '] -> ' + messageAuthor + ': ' + message.content)}
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
    const req = await GuildModel.findOne({ id: message.guild.id })
    if(!req){
        const init = new GuildModel({ id: message.guild.id })
        await init.save();

        const oprix = config.bot.prefix;
    } else {
        var oprix = req.prefix;
    }

    const userListed = await UserModel.findOne({ id: message.member.id })
    if(!userListed){
        const init = new UserModel({ id: message.member.id })
        await init.save();

        const oprix = config.bot.prefix;
    }
    if(!message.content.startsWith(oprix)) return;

    if(req.blacklisted == undefined || req.blacklisted == null){
        const blackListAdd = new GuildModel({ id: message.guild.id, blacklisted: false })
        await blackListAdd.save();
    } else {
        if(req.blacklisted == true){
            if(blackListMsgStatus == true){
                var MsgActive = true;
            } else {
                var MsgActive = false;
            }
            if(blackListMsg.length <= 0){
                var cStatus = 'Not delivered.';
            } else {
                var cStatus = blackListMsg;
            }

            if(MsgActive == true){
                const blackListEmbed = new Discord.MessageEmbed;

                blackListEmbed.setTitle('Server BlackListed!');
                blackListEmbed.setColor(colors.error);
                blackListEmbed.setDescription('Your server was put on a BlackList by the bot ' + system.teamName + '!');
                blackListEmbed.setTimestamp();
                blackListEmbed.addField('Message', cStatus, false)

                return message.channel.send(blackListEmbed);
            }

            return console.log('ERR -> BLACKLISTED SERVER USED A COMMAND, COMMAND STATUS: ' + cStatus);
        }
    }
    let args = message.content.slice(oprix.length).trim().split(/ +/g);
    let cmd;
    cmd = args.shift().toLocaleLowerCase();
    let commandfile = bot.commands.get(cmd.slice(oprix.length));
    if(commandfile) commandfile.run(bot, message, args);
    if(config.bot.commandLogging == true){console.log('CL -> ' + message.content + ' command used in: [' + message.guild.name + '] - By: ' + messageAuthor)}
    if(bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }
    try {
        command.run(bot, message, args);
    } catch (e) {
        return;
    }
})


bot.login(config.bot.token);