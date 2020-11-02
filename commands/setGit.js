const Discord = require("discord.js");
const UserModel = require('../models/User')
const { connect } = require('mongoose');
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        if(!args.length) return message.reply('You didn\'t provide a github url, example `https://github.com/wezacon`');
        if(!message.content.includes("https://github.com/")) return message.reply('Please provide a valid github url, example `https://github.com/wezacon`');

        const github = args[0];
        const req = await UserModel.findOne({ id: message.member.id })
        if(!req){
            const doc = new UserModel({ id: message.member.id, github: github })
            await doc.save();
        }
        if(req.github == 'null'){
            const doc = await UserModel.findOneAndUpdate({ id: message.member.id }, { github: github }, {new: true})
        } else {
            const doc = await UserModel.findOneAndUpdate({ id: message.member.id }, { github: github }, {new: true});
        } 
        return message.reply(`profile updated!\n` + config.siteUrl + '/user/' + message.member.id);
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
}

module.exports.help = {
    name: "giturl",
    aliases: []
}