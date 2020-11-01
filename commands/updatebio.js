const Discord = require("discord.js");
const UserModel = require('../models/User')
const { connect } = require('mongoose');
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        if(!args.length) return message.reply('You didn\'t provide a bio.');
        if(args.length > 500) return message.reply('Error, You can\'t have more than `500` characters.');

        const bio1 = args.join(" ");
        function nl2br(str){
            return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
        const bio2 = bio1.replace(/<[^>]+>/g, '');
        const bio = nl2br(bio2);
        const req = await UserModel.findOne({ id: message.member.id })
        if(!req){
            const doc = new UserModel({ id: message.member.id, bio: bio })
            await doc.save();
        }
        if(req.bio == 'null'){
            const doc = await UserModel.findOneAndUpdate({ id: message.member.id }, { bio: bio }, {new: true})
            message.reply(`Bio updated!\n` + config.siteUrl + '/user/' + message.member.id);
        } else {
            const doc = await UserModel.findOneAndUpdate({ id: message.member.id }, { bio: bio }, {new: true});
            message.reply(`Bio updated!\n` + config.siteUrl + '/user/' + message.member.id);
        } 
    } catch (error) {
        message.channel.send("A wild error appeared!: " + error.message + "\nYou are not supposed to see this, please report this to: https://github.com/wezacon/dbos/issues");
    }
}

module.exports.help = {
    name: "bio",
    aliases: ["setbio"]
}