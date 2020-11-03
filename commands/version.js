const Discord = require("discord.js");
const config = require('../config.json');
const color = require('../colors.json');
const pack = require('../package.json');
module.exports.run = async (bot, message, args) => {
    try {
        const Embed = new Discord.MessageEmbed();
            Embed.setColor(color.info);
            Embed.setTitle('**Version control**')
            Embed.setURL(config.siteUrl)
            Embed.addFields(
                { name: '**Bot Version**', value: `${config.bot.ver}`, inline: true },
                { name: '**Template Version**', value: `${pack.version} - Author: [${pack.author}](${pack.homepage})`, inline: true }, // Do *not* remove the author otherwise the licence will be broken and copyright issues will be in place!
            )
        message.channel.send(Embed);
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
    name: "version",
    aliases: ["vc"]
}