const Discord = require("discord.js");
const UserModel = require('../models/User')
const { connect } = require('mongoose');
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        if(!args.length) return message.reply('You didn\'t provide a server invite, example `https://discord.gg/83nXAu4nSG`');
        if(!message.content.includes("https://discord.gg/")) return message.reply('Please provide a valid discord url, example `https://discord.gg/83nXAu4nSG`');

        const discordServer = args[0];
        const req = await UserModel.findOne({ id: message.member.id })
        if(!req){
            const doc = new UserModel({ id: message.member.id, discordServer: discordServer })
            await doc.save();
        }
        if(req.discordServer == 'null'){
            const doc = await UserModel.findOneAndUpdate({ id: message.member.id }, { discordServer: discordServer }, {new: true})
        } else {
            const doc = await UserModel.findOneAndUpdate({ id: message.member.id }, { discordServer: discordServer }, {new: true});
        } 
        return message.reply(`profile updated!\n` + config.siteUrl + '/user/' + message.member.id);
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
}

module.exports.help = {
    name: "discordurl",
    aliases: []
}