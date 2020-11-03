const Discord = require("discord.js");
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
            message.channel.send(`Current prefix: \`${config.bot.prefix}\``);
        } else {
            message.channel.send(`Current prefix: \`${req.prefix}\``);  
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
    name: "prefix",
    aliases: []
}