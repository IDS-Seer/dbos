const Discord = require("discord.js");
const GuildModel = require('../models/Guild')
const { connect } = require('mongoose');
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        if(!message.guild.id == config.bot.moderation.server.id) return;
            if(!message.member.roles.cache.has(config.bot.moderation.server.adminRoleId)) return;
            const Target = args[0];
            if(Target === config.bot.moderation.server.id) return message.reply('I can\'t whitelist the moderation server!');

            if(!Target) return message.reply('Please enter in a valid server id');

            if(!Target.length > 5) return message.reply('Please enter in a valid server id');

            const req = await GuildModel.findOne({ id: Target })
            if(!req){
                const doc = new GuildModel({ id: Target })
                await doc.save();
            }


            if(req.blacklisted == null || req.blacklisted == undefined){
                const doc = await GuildModel.findOneAndUpdate({ id: Target}, { $set: { blacklisted: false }}, { new: true })
                message.reply(`I've succesfully whitelisted: \`${doc.id}\``);
            } else {
                const doc = await GuildModel.findOneAndUpdate({ id: Target}, { $set: { blacklisted: false }}, { new: true })
                message.reply(`I've succesfully whitelisted: \`${doc.id}\``);
            }
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
    
}

module.exports.help = {
    name: "whitelist",
    aliases: []
}