const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        message.reply('This is a template command!')
           // Take note, you can make a command by putting the outcome here
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }

 
}

// Put the command args here (What calls it)
module.exports.help = {
    name: "temp",
    aliases: []
}