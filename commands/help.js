const Discord = require("discord.js");
const colors = require('../colors.json');
const GuildModel = require('../models/Guild')
const { connect } = require('mongoose');
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        const req = await GuildModel.findOne({ id: message.guild.id })
            if(!req){
                const doc = new GuildModel({ id: message.guild.id })
                await doc.save();
            }
            if(req.prefix == 'null'){
                var prefix = config.bot.prefix;
            } else {
                var prefix = req.prefix;
            }
            const helpEmbed = new Discord.MessageEmbed();
                    helpEmbed.setColor(colors.info)
                    helpEmbed.setTitle('**Help**')
                    helpEmbed.setURL(config.siteUrl)
                    helpEmbed.setDescription('The simple yet powerful open source discord bot!')
                    helpEmbed.setThumbnail(config.iconUrl)
                    helpEmbed.addFields(
                        { name: '**Fun**', value: `${prefix}ping\n${prefix}prefix\n${prefix}server\n${prefix}rank\n${prefix}leaderboard`, inline: true },
                        { name: '**Admin**', value: `${prefix}setprefix\n${prefix}resetprefix\n${prefix}kick\n${prefix}ban\n${prefix}clear`, inline: true },
                    )
                    
                    helpEmbed.setTimestamp()
                    helpEmbed.setFooter('© Wezacon.com', 'https://github.com/wezacon/dbos/blob/main/public/img/Wezacon-icon.png?raw=true');
        
            message.channel.send(helpEmbed);
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
    
}

module.exports.help = {
    name: "help",
    aliases: []
}