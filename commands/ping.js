const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        thisshould
        const m = await message.channel.send("ping?");
        m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms`); 
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
}

module.exports.help = {
    name: "ping",
    aliases: []
}