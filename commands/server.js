const Discord = require("discord.js");
const config = require('../config.json');
const color = require('../colors.json');

module.exports.run = async (bot, message, args) => {
    try {
        const Embed = new Discord.MessageEmbed();
            Embed.setColor(color.success);
            Embed.setTitle('**Server Info**')
            Embed.setURL(config.siteUrl)
            Embed.addFields(
                { name: '**Server Name**', value: `${message.guild.name}`, inline: true },
                { name: '**Users**', value: `${message.guild.memberCount}`, inline: true },
            )
        message.channel.send(Embed);
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }

}

module.exports.help = {
    name: "server",
    aliases: ["si"]
}