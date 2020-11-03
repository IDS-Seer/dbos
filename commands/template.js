const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        message.reply('This is a template command!')
           // Take note, you can make a command by putting the outcome here
    } catch (error) {
        const c = require("../colors.json");
        const Err_1 = new Discord.MessageEmbed()
            .setColor(c.error)
            .setTitle("**Error**")
            .setDescription("I have encountered a unexpected error: `"+ error.message +"`\nplease report this to: https://dbos.flarum.cloud or https://github.com/wezacon/dbos")
        return message.channel.send(Err_1);
    }

 
}

// Put the command args here (What calls it)
module.exports.help = {
    name: "temp",
    aliases: []
}