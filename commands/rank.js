const Discord = require("discord.js");
const Levels = require('discord-xp');
const c = require("../colors.json");
module.exports.run = async (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);

    const embed = new Discord.MessageEmbed()
        .setColor(c.gold)
        .setAuthor(`${message.member.user.tag}`, message.author.displayAvatarURL())
        .setDescription(`You are currently level **${user.level}**!`)
    message.channel.send(embed)
}

module.exports.help = {
    name: "rank",
    aliases: ["level"]
}