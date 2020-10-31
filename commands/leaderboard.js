const Discord = require("discord.js");
const Levels = require('discord-xp');
const c = require("../colors.json");
module.exports.run = async (bot, message, args) => {
    try {
        const rawLeaderBoard = await Levels.fetchLeaderboard(message.guild.id, 10);
            if(rawLeaderBoard.length < 1) return message.reply('Nobody\'s on the leaderboard yet...');

            const leaderboard = Levels.computeLeaderboard(bot, rawLeaderBoard);
            const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}**`);

            const embed = new Discord.MessageEmbed()
                .setColor(c.gold)
                .setTitle("**LeaderBoard**")
                .setDescription(lb.join("\n\n"))
            message.channel.send(embed)
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
    
}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb"]
}