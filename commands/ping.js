const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        const m = await message.channel.send("ping?");
        m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms`); 
    } catch (error) {
        const c = require("../colors.json");
        const Err_1 = new Discord.MessageEmbed()
            .setColor(c.error)
            .setTitle("**Error**")
            .setDescription("I have encountered a unexpected error: `"+ error.message +"`\nplease report this to: https://dbos.flarum.cloud or https://github.com/wezacon/dbos")
        return message.channel.send(Err_1);
    }
}

module.exports.help = {
    name: "ping",
    aliases: []
}