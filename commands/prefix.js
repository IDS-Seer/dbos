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
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }

}

module.exports.help = {
    name: "prefix",
    aliases: []
}