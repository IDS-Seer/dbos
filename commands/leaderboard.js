const Discord = require("discord.js");
const Levels = require('discord-xp');
const levels = require("../models/Levels");
const c = require("../colors.json");
const config = require("../config.json");
module.exports.run = async (bot, message, args) => {
    try {
            const embed = new Discord.MessageEmbed()
                .setColor(c.gold)
                .setTitle("**LeaderBoard**")
                .setDescription(config.siteUrl + "/" + message.guild.id + '/leaderboard')
            message.channel.send(embed)

    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
    
}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb"]
}