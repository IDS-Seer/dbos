const Discord = require("discord.js");
const Levels = require('discord-xp');
const c = require("../colors.json");
module.exports.run = async (bot, message, args) => {
    const rawLeaderBoard = await Levels.fetchLeaderboard(message.guild.id, 10);
    if(rawLeaderBoard.length < 1) return message.reply('Nobody\'s on the leaderboard yet...');

    const leaderboard = Levels.computeLeaderboard(bot, rawLeaderBoard);
    const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}**`);

    const embed = new Discord.MessageEmbed()
        .setColor(c.gold)
        .setTitle("**LeaderBoard**")
        .setDescription(lb.join("\n"))
    message.channel.send(embed)
}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb"]
}