const Discord = require("discord.js");
const config = require("../config.json");
module.exports.run = async (bot, message, args) => {
    try {
        const Auth = message.author.id;
        message.reply('Here\'s your profile: ' + config.siteUrl + '/user/' + Auth);
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
}

module.exports.help = {
    name: "page",
    aliases: []
}