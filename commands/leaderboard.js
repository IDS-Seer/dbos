const Discord = require("discord.js");
const Levels = require('discord-xp');
const levels = require("../models/Levels");
const c = require("../colors.json");
module.exports.run = async (bot, message, args) => {
    try {
        var guildId = message.guild.id;
        var limit = 10;
        const users = await levels.find({ guildID: guildId }, { limit: 10 }).sort([['xp', 'descending']]).exec();

        const xp = users.xp;
        console.log(xp)
        const ranked = users.slice(0, limit);

        const rawLeaderBoard = await Levels.fetchLeaderboard(message.guild.id, 10);
            if(rawLeaderBoard.length < 1) return message.reply('Nobody\'s on the leaderboard yet...');

            const leaderboard = Levels.computeLeaderboard(bot, rawLeaderBoard);
            const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}**`);
            try {
            const embed = new Discord.MessageEmbed()
                .setColor(c.gold)
                .setTitle("**LeaderBoard**")
                .setDescription(xp)
            message.channel.send(embed)
            } catch (error) {
                console.log("[ERROR] " + error.message)
            }

    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
    
}

module.exports.help = {
    name: "",
    aliases: [""]
}