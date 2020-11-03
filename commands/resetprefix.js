const Discord = require("discord.js");
const GuildModel = require('../models/Guild')
const { connect } = require('mongoose');
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You are missing the following permissions: `ADMINISTRATOR`');
            const req = await GuildModel.findOne({ id: message.guild.id })
            if(!req){
                const doc = new GuildModel({ id: message.guild.id })
                await doc.save();
            }
            if(req.prefix == 'null'){
                const doc = await GuildModel.findOneAndUpdate({ id: message.guild.id}, { $set: { prefix: config.bot.prefix }}, { new: true })
                message.reply(`Set the prefix to: \`${doc.prefix}\``)
            } else {
                const doc = await GuildModel.findOneAndUpdate({ id: message.guild.id}, { $set: { prefix: config.bot.prefix }}, { new: true });
                    message.reply(`Set the prefix to: \`${doc.prefix}\``)
            } 
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
    name: "resetprefix",
    aliases: []
}