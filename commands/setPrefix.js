const Discord = require("discord.js");
const GuildModel = require('../models/Guild')
const { connect } = require('mongoose');
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You are missing the following permissions: `ADMINISTRATOR`');
        if(!args.length) return message.reply('You didn\'t provide a prefix.');
        const req = await GuildModel.findOne({ id: message.guild.id })
        if(!req){
            const doc = new GuildModel({ id: message.guild.id })
            await doc.save();
        }
        if(req.prefix == 'null'){
            const doc = await GuildModel.findOneAndUpdate({ id: message.guild.id}, { $set: { prefix: args[0] }}, { new: true })
            message.reply(`Set the prefix to: \`${doc.prefix}\``)
        } else {
            const doc = await GuildModel.findOneAndUpdate({ id: message.guild.id}, { $set: { prefix: args[0] }}, { new: true });
                message.reply(`Set the prefix to: \`${doc.prefix}\``)
        } 
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
}

module.exports.help = {
    name: "setprefix",
    aliases: []
}